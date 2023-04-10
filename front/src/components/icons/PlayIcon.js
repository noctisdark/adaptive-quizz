const PlayIcon = ({size = 16, ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M3 22v-20l18 10-18 10z" />
  </svg>
);

export default PlayIcon;