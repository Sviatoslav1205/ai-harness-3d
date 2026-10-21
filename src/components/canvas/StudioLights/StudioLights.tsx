export const StudioLights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 4, -5]} intensity={0.4} />
    </>
  );
};
