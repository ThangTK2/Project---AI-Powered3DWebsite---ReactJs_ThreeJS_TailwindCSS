/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber' //Canvas trong @react-three/fiber là một component cung cấp bởi thư viện, được sử dụng để tạo ra một bối cảnh 3D trong ứng dụng của bạn. Nó sẽ tạo ra một khung canvas WebGL mà bạn có thể sử dụng để vẽ các đối tượng 3D, cảnh 3D và hiệu ứng đồ họa khác.
import { Environment, Center } from '@react-three/drei'; ////hỗ trợ việc phát triển ứng dụng Three.js trong môi trường React. Nó cung cấp nhiều thành phần và tiện ích hữu ích giúp tạo ra các hiệu ứng, ánh sáng, bóng đổ và nhiều tính năng khác trong không gian 3D.

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';

const CanvasModel = () => {
  return (
    <Canvas //<Canvas> từ thư viện @react-three/fiber để tạo ra một cảnh Three.js.
      shadows //bật/tắt hiển thị bóng đổ trong cảnh.
      camera={{ position: [0, 0, 0], fov: 30 }}  //fov (Field of View) đặt góc nhìn của máy ảnh là 25 độ.(zoom to nhỏ áo)
      gl={{ preserveDrawingBuffer: true }} // liên quan đến việc giữ lại bộ đệm vẽ.
      className="w-full max-w-full h-full transition-all ease-in"
    > 
      {/*ambientLight: một component của Three.js được sử dụng để tạo ánh sáng môi trường (ambient light) trong môi trường 3D || intensity:cường độ ánh sáng  */}
      {/* Component Environment: tạo ra một môi trường 3D bằng cách sử dụng một ảnh panorama (còn được gọi là hình ảnh 360 độ) hoặc một cube map || preset="city" sẽ tạo ra một hình ảnh panorama 360 độ của một phong cảnh thành phố */}
      <ambientLight intensity={0.5} /> 
      <Environment preset="city" />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
