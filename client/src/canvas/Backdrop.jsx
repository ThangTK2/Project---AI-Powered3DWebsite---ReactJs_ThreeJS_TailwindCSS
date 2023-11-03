import { useRef } from 'react' //tham chiếu đến một phần tử DOM hoặc một giá trị có thể thay đổi trong một thành phần React.
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'; //hỗ trợ việc phát triển ứng dụng Three.js trong môi trường React. Nó cung cấp nhiều thành phần và tiện ích hữu ích giúp tạo ra các hiệu ứng, ánh sáng, bóng đổ và nhiều tính năng khác trong không gian 3D.

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows //hiển thị bóng đổ
      ref={shadows}
      temporal //temporal: Thuộc tính này có thể được sử dụng để kích hoạt hiển thị bóng đổ dựa trên thời gian.
      frames={50} //số khung hình (frames) được sử dụng để tính toán bóng đổ. Trong trường hợp này, 50 khung hình sẽ được sử dụng.
      alphaTest={0.85}  //Đây có thể là một giá trị được sử dụng để kiểm soát việc hiển thị của các pixel trong bóng đổ.
      scale={10}  //để cài đặt tỷ lệ (scale) của thành phần AccumulativeShadows.
      rotation={[Math.PI / 2, 0, 0]} //góc quay (rotation) của thành phần. Trong trường hợp này, thành phần được quay 90 độ theo trục X.
      position={[0, 0, -0.14]}  //vị trí (position) của thành phần AccumulativeShadows trong không gian 3D, 
    >
      <RandomizedLight //hiệu ứng ánh sáng ngẫu nhiên trong một cảnh Three.js. Điều này có thể hữu ích để thêm ánh sáng động và đa dạng vào môi trường 3D.
        amount={4} //để chỉ định số lượng ánh sáng hoặc nguồn sáng.
        radius={9} //để cài đặt bán kính của ánh sáng hoặc nguồn sáng.
        intensity={0.55} //cường độ của ánh sáng.
        ambient={0.25}  // ánh sáng môi trường (ambient light). Nó có thể được sử dụng để cài đặt mức độ ánh sáng môi trường.
        position={[5, 5, -10]}
      />
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop