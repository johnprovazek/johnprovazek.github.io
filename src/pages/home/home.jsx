import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../components/firebase/firebase.jsx";
import useLocalStorage from "../../hooks/useLocalStorage";
import Project from "../../components/project/project.jsx";
import Social from "../../components/social/social.jsx";
import AvatarImage from "../../assets/images/avatar.png";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

// Converts days to milliseconds.
const daysToMs = (days) => {
  return days * 24 * 60 * 60 * 1000;
};

const HomePage = () => {
  // Using custom hook to update state and local storage with epoch date included.
  const [repos, setRepos] = useLocalStorage("portfolio_v0", []);

  useEffect(() => {
    const firebaseRequest = async () => {
      const docRef = doc(db, "portfolio", "data");
      const response = await getDoc(docRef);
      if (response.exists()) {
        let reposData = response.data()["repos"];
        setRepos(reposData);
      }
    };
    // Request Firebase data if array is empty, does not exist, or local storage was last updated more than 15 days ago.
    if (!Array.isArray(repos.data) || !repos.data.length || Date.now() - repos.epoch > daysToMs(15)) {
      firebaseRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repos]);

  return (
    <Container maxWidth="pf" sx={{ mb: 3, mt: 3 }}>
      <Avatar src={AvatarImage} variant="square" sx={{ width: 80, height: 80, margin: "auto" }} alt="john-picture" />
      <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
        John Provazek
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 1 }}>
        Hello! I&#39;m a Web Developer currently located in San Ramon, CA. In my free time I like working on creative
        projects of all shapes and sizes. You can find a collection of side projects I maintain listed below.
      </Typography>
      <Social />
      <Stack spacing={3} sx={{ mt: 1, mb: 3 }}>
        {repos.data.map((repo) => (
          <Project key={repo.name} details={repo} />
        ))}
      </Stack>
      {repos.data.length > 0 && <Social />}
    </Container>
  );
};

export default HomePage;
