import { useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardActionArea from "@mui/material/CardActionArea";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Project = ({ details }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card>
      <CardHeader
        action={
          <Stack direction="row">
            {details.homepage !== "" && (
              <IconButton href={details.homepage} aria-label="homepage-button">
                <OpenInNewIcon />
              </IconButton>
            )}
            <IconButton href={details.github} aria-label="github-button">
              <GitHubIcon />
            </IconButton>
          </Stack>
        }
        title={details.name}
      />
      <CardContent>
        <Typography color="text.secondary" sx={{ pb: 2 }}>
          {details.description}
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
          <CardActionArea href={details.homepage !== "" ? details.homepage : details.github}>
            <CardMedia
              component="img"
              alt="repo-image"
              image={details.image}
              onLoad={() => setImageLoaded(true)}
              sx={{ display: imageLoaded ? "block" : "none", borderRadius: 1 }}
            />
          </CardActionArea>
        </Box>
        <Typography color="text.secondary">{details.tech}</Typography>
      </CardContent>
    </Card>
  );
};

export default Project;
