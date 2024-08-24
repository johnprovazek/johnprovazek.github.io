import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

const Social = () => {
  return (
    <Stack alignItems="center" justifyContent="center" direction="row">
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

export default Social;
