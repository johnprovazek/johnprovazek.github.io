import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ProjectCard from "../../components/ProjectCard/ProjectCard.jsx";
import SocialLinks from "../../components/SocialLinks/SocialLinks.jsx";
import AvatarImage from "../../assets/images/avatar.png";
import useFirebaseLocalStorageRepos from "../../hooks/useFirebaseLocalStorageRepos.js";

const PORTFOLIO_REPOS_KEY_NAME = "johnprovazek-portfolio-repos";

const HomePage = () => {
  const repos = useFirebaseLocalStorageRepos(PORTFOLIO_REPOS_KEY_NAME);
  const minimumOneRepo = repos.length > 0;
  const minimumThreeRepos = repos.length >= 3;

  return (
    <Box>
      <Container maxWidth="pf" sx={{ mb: 3, pt: 3 }}>
        <Avatar
          src={AvatarImage}
          variant="square"
          sx={{ width: 80, height: 80, margin: "auto" }}
          alt="john-avatar-picture"
        />
        <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "bold", mb: 2 }}>
          John Provazek
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1 }}>
          Hello! I&#39;m a Web Developer currently located in San Ramon, California. In my free time I like working on
          creative projects of all shapes and sizes.
          {minimumOneRepo && " You can find a collection of side projects I maintain listed below."}
        </Typography>
        <SocialLinks />
        {minimumOneRepo && (
          <Stack spacing={3} sx={{ mb: 3 }}>
            {repos.map((repo) => (
              <ProjectCard
                key={repo.name}
                homepage={repo.homepage}
                github={repo.github}
                name={repo.name}
                description={repo.description}
                image={repo.image}
                tech={repo.tech}
              />
            ))}
          </Stack>
        )}
        <SocialLinks visible={minimumThreeRepos} />
      </Container>
    </Box>
  );
};

export default HomePage;
