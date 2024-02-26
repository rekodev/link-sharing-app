import { useContext, useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import ProfileForm from "../../components/ProfileForm";
import ProfilePictureCard from "../../components/ProfilePictureCard";
import { ProfileDetailsContext } from "../../contexts/profileDetailsContext";
import {
  StyledProfile,
  StyledProfileContainer,
  StyledSaveButtonWrapper,
} from "./style";
import LinksPreview from "../../components/LinksPreview";
import { LinkContext } from "../../contexts/linkContext";
import useGetUserById from "../../hooks/useGetUserById";
import { CircularProgress } from "@mui/material";

const Profile = () => {
  const { data, isLoading } = useGetUserById();

  const { profileDetails, setProfileDetails } = useContext(
    ProfileDetailsContext
  );
  const { links } = useContext(LinkContext);
  const [newProfileDetails, setNewProfileDetails] = useState(profileDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imageData, setImageData] = useState<
    { src: string; name: string } | undefined
  >(profileDetails.profilePicture);

  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  useEffect(() => {
    if (!data) return;

    console.log("DATA", data);

    setNewProfileDetails({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      profilePicture: {
        src: "",
        name: "",
      },
    });
  }, [data]);

  if (isLoading)
    return <CircularProgress color="primary" sx={{ margin: "auto" }} />;

  return (
    <>
      <LinksPreview
        links={links}
        profileDetails={newProfileDetails}
        imageData={imageData}
        user={data}
      />
      <StyledProfile>
        <StyledProfileContainer>
          <h2>Profile Details</h2>
          <p>Add your details to create a personal touch to your profile.</p>
          <ProfilePictureCard
            imageData={imageData}
            setImageData={setImageData}
          />
          <ProfileForm
            ref={formRef}
            setProfileDetails={setProfileDetails}
            newProfileDetails={newProfileDetails}
            setNewProfileDetails={setNewProfileDetails}
            setIsSubmitting={setIsSubmitting}
          />
        </StyledProfileContainer>
        <StyledSaveButtonWrapper>
          <Button
            variant="contained"
            text="Save"
            type="submit"
            onClick={handleSaveClick}
            isLoading={isSubmitting}
          />
        </StyledSaveButtonWrapper>
      </StyledProfile>
    </>
  );
};

export default Profile;
