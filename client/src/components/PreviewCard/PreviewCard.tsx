import { useContext, useEffect } from "react";
import { ProfileDetailsContext } from "../../contexts/profileDetailsContext";
import {
  StyledAvatar,
  StyledPreviewCard,
  StyledProfilePictureWrapper,
} from "./style";
import { CopiedLinkContext } from "../../contexts/copiedLinkContext";
import { useLocation } from "react-router-dom";
import Svg from "../Svg";
import linkIcon from "../../assets/images/icon-link-copied-to-clipboard.svg";
import { Snackbar } from "@mui/material";
import { StyledAlert } from "../../styles/UtilityStyles";
import useGetUserById from "../../hooks/useGetUserById";

interface IPreviewCardProps {
  atLeastOnePlatform: boolean;
}

const PreviewCard = ({ atLeastOnePlatform }: IPreviewCardProps) => {
  const { profileDetails } = useContext(ProfileDetailsContext);
  const { copiedLink, setCopiedLink } = useContext(CopiedLinkContext);

  const { data, isLoading } = useGetUserById();
  const location = useLocation();

  useEffect(() => {
    setCopiedLink(false);
  }, [location, setCopiedLink]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      setCopiedLink(false);
      return;
    }

    setCopiedLink(false);
  };

  if (isLoading) return null;

  return (
    <StyledPreviewCard>
      <StyledProfilePictureWrapper>
        {profileDetails.profilePicture.src ? (
          <img src={profileDetails.profilePicture.src} alt="Profile Picture" />
        ) : (
          <StyledAvatar />
        )}
      </StyledProfilePictureWrapper>
      <h3>{`${data.firstName} ${data.lastName}`}</h3>
      <p>{data.email}</p>

      {atLeastOnePlatform ? (
        <Snackbar
          open={copiedLink}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <StyledAlert
            icon={<Svg noHeight url={linkIcon} />}
            onClose={handleClose}
            severity="info"
            sx={{ width: "100%" }}
          >
            The link has been copied to your clipboard!
          </StyledAlert>
        </Snackbar>
      ) : (
        <Snackbar
          open={copiedLink}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <StyledAlert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Add at least one platform
          </StyledAlert>
        </Snackbar>
      )}
    </StyledPreviewCard>
  );
};

export default PreviewCard;
