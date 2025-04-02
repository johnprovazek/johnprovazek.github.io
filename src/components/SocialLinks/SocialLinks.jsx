import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Stack from "@mui/material/Stack";

const SocialLinks = ({ visible = true }) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      direction="row"
      sx={{ mb: 1, visibility: visible ? "visible" : "hidden" }}
    >
      <IconButton href="https://www.linkedin.com/in/johnprovazek/">
        <LinkedInIcon />
      </IconButton>
      <IconButton href="https://github.com/johnprovazek/">
        <GitHubIcon />
      </IconButton>
      <IconButton href="mailto:john@johnprovazek.com?Subject=Hello,%20John!">
        <EmailIcon />
      </IconButton>
    </Stack>
  );
};

export default SocialLinks;
