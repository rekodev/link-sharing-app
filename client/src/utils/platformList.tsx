import iconCodepen from '../assets/images/icon-codepen.svg';
import iconCodewars from '../assets/images/icon-codewars.svg';
import iconDevTo from '../assets/images/icon-devto.svg';
import iconFacebook from '../assets/images/icon-facebook.svg';
import iconFreeCodeCamp from '../assets/images/icon-freecodecamp.svg';
import iconFrontendMentor from '../assets/images/icon-frontend-mentor.svg';
import iconGitHub from '../assets/images/icon-github.svg';
import iconGitLab from '../assets/images/icon-gitlab.svg';
import iconHashnode from '../assets/images/icon-hashnode.svg';
import iconLinkedIn from '../assets/images/icon-linkedin.svg';
import iconStackOverflow from '../assets/images/icon-stack-overflow.svg';
import iconTwitch from '../assets/images/icon-twitch.svg';
import iconTwitter from '../assets/images/icon-twitter.svg';
import iconYouTube from '../assets/images/icon-youtube.svg';
import Svg from '../components/shared/Svg';

export const platforms = [
  {
    name: 'GitHub',
    icon: <img src={iconGitHub} alt='GitHub' />,
    svgIcon: <Svg url={iconGitHub} />,
  },
  {
    name: 'Frontend Mentor',
    icon: <img src={iconFrontendMentor} alt='Frontend Mentor' />,
    svgIcon: <Svg url={iconFrontendMentor} />,
  },
  {
    name: 'Twitter',
    icon: <img src={iconTwitter} alt='Twitter' />,
    svgIcon: <Svg url={iconTwitter} />,
  },
  {
    name: 'LinkedIn',
    icon: <img src={iconLinkedIn} alt='LinkedIn' />,
    svgIcon: <Svg url={iconLinkedIn} />,
  },
  {
    name: 'YouTube',
    icon: <img src={iconYouTube} alt='YouTube' />,
    svgIcon: <Svg url={iconYouTube} />,
  },
  {
    name: 'Facebook',
    icon: <img src={iconFacebook} alt='Facebook' />,
    svgIcon: <Svg url={iconFacebook} />,
  },
  {
    name: 'Twitch',
    icon: <img src={iconTwitch} alt='Twitch' />,
    svgIcon: <Svg url={iconTwitch} />,
  },
  {
    name: 'Dev.to',
    icon: <img src={iconDevTo} alt='Dev.to' />,
    svgIcon: <Svg url={iconDevTo} />,
  },
  {
    name: 'Codewars',
    icon: <img src={iconCodewars} alt='Codewars' />,
    svgIcon: <Svg url={iconCodewars} />,
  },
  {
    name: 'Codepen',
    icon: <img src={iconCodepen} alt='Codepen' />,
    svgIcon: <Svg url={iconCodepen} />,
  },
  {
    name: 'freeCodeCamp',
    icon: <img src={iconFreeCodeCamp} alt='freeCodeCamp' />,
    svgIcon: <Svg url={iconFreeCodeCamp} />,
  },
  {
    name: 'GitLab',
    icon: <img src={iconGitLab} alt='GitLab' />,
    svgIcon: <Svg url={iconGitLab} />,
  },
  {
    name: 'Hashnode',
    icon: <img src={iconHashnode} alt='Hashnode' />,
    svgIcon: <Svg url={iconHashnode} />,
  },
  {
    name: 'Stack Overflow',
    icon: <img src={iconStackOverflow} alt='Stack Overflow' />,
    svgIcon: <Svg url={iconStackOverflow} />,
  },
];
