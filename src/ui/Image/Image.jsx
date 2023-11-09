const Image = ({ src, alt, size, style = {} }) => {
  return <img src={src} alt={alt} width={size} style={style} />;
};
