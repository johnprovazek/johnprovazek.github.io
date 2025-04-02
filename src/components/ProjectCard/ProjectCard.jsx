import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BrokenImage from "../../assets/images/broken-image.png";

const ProjectCard = ({
  homepage = "https://en.wikipedia.org/wiki/Missing_link_(human_evolution)",
  github = "https://en.wikipedia.org/wiki/Missing_link_(human_evolution)",
  name = "missing title",
  description = "missing description",
  image = BrokenImage,
  tech = "missing technology stack info",
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card>
      <CardHeader
        action={
          <Stack direction="row">
            {homepage !== "" && (
              <IconButton href={homepage} aria-label="homepage-button">
                <OpenInNewIcon />
              </IconButton>
            )}
            <IconButton href={github} aria-label="github-button">
              <GitHubIcon />
            </IconButton>
          </Stack>
        }
        title={name}
      />
      <CardContent>
        <Typography color="text.secondary" sx={{ pb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ pb: 2 }}>
          <Box
            bgcolor="offwhite.main"
            alignItems="center"
            justifyContent="center"
            sx={{
              height: "auto",
              width: "100%",
              aspectRatio: 2,
              display: imageLoaded ? "none" : "flex",
              borderRadius: 1,
            }}
          >
            <CircularProgress />
          </Box>
          <CardMedia
            component="img"
            alt="repo-image"
            image={image}
            onLoad={() => setImageLoaded(true)}
            sx={{ display: imageLoaded ? "block" : "none", borderRadius: 1 }}
          />
        </Box>
        <Typography color="text.secondary">{tech}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
