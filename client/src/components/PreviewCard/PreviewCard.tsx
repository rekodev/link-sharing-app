import { Snackbar } from "@mui/material";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  StyledAvatar,
  StyledPreviewCard,
  StyledProfilePictureWrapper,
} from "./style";
import linkIcon from "../../assets/images/icon-link-copied-to-clipboard.svg";
import { CopiedLinkContext } from "../../contexts/copiedLinkContext";
import useUser from "../../hooks/useUser";
import { StyledAlert } from "../../styles/UtilityStyles";
import Svg from "../shared/Svg";

const REVALIDATE_ON_MOUNT = true;

type Props = {
  atLeastOnePlatform: boolean;
};

const PreviewCard = ({ atLeastOnePlatform }: Props) => {
  const { copiedLink, setCopiedLink } = useContext(CopiedLinkContext);

  const { user, isUserLoading } = useUser(REVALIDATE_ON_MOUNT);
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

  const renderSnackbar = () => {
    if (atLeastOnePlatform)
      return (
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
      );

    return (
      <Snackbar open={copiedLink} autoHideDuration={6000} onClose={handleClose}>
        <StyledAlert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          Add at least one platform
        </StyledAlert>
      </Snackbar>
    );
  };

  if (!user || isUserLoading) return null;

  return (
    <StyledPreviewCard>
      <StyledProfilePictureWrapper>
        {user.profilePictureUrl ? (
          <img src={user.profilePictureUrl} alt="Profile Picture" />
        ) : (
          <StyledAvatar />
        )}
      </StyledProfilePictureWrapper>
      <h3>{`${user.firstName} ${user.lastName}`}</h3>
      <p>{user.email}</p>

      {renderSnackbar()}
    </StyledPreviewCard>
  );
};

export default PreviewCard;
