import { Sphere, useTexture } from '@react-three/drei';

export default function Earth() {
  const texture = useTexture('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
  return (
    <Sphere>
      <meshStandardMaterial map={texture} />
    </Sphere>
  )
}