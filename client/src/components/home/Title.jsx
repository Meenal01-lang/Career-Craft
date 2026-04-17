const Title = ({ title, description }) => {
  return (
    <div className="text-center mt-6 text-white">
      <h2 className="text-3xl sm:text-4xl font-medium">{title}</h2>
      <p className="max-w-2xl mx-auto mt-4 text-white/55">{description}</p>
    </div>
  );
};

export default Title;
