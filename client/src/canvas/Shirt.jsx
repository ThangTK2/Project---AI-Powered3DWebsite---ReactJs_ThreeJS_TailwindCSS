/* eslint-disable react/no-unknown-property */
import { easing } from 'maath'; //easing trong thư viện 'maath' có thể cung cấp các hàm điều chỉnh tốc độ thay đổi của một giá trị theo thời gian, giúp tạo ra các hiệu ứng chuyển động mượt mà trong các animation.
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei'; ////hỗ trợ việc phát triển ứng dụng Three.js trong môi trường React. Nó cung cấp nhiều thành phần và tiện ích hữu ích giúp tạo ra các hiệu ứng, ánh sáng, bóng đổ và nhiều tính năng khác trong không gian 3D.
import state from '../store';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  //useFrame từ thư viện @react-three/fiber để định nghĩa một hàm gọi lại sẽ được gọi mỗi khi có một khung hình mới. Tham số state đại diện cho trạng thái hiện tại của animation, và delta là thời gian đã trôi qua kể từ khung hình trước đó.
  //dampC: áp dụng một hiệu ứng dịu dàng
  //materials.lambert1.color: là việc truy cập vào thuộc tính màu sắc của một vật liệu có tên là lambert1. Nó sẽ được sử dụng như giá trị bắt đầu cho quá trình dịu dàng.
  //snap.color: màu sắc bên index/store
  //0.25: tốc độ của hiệu ứng dịu dàng.
  //delta: Tham số này đại diện cho thời gian đã trôi qua kể từ khung hình trước đó, giúp kiểm soát tiến triển của animation.
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap); //thay đổi trạng thái

  return (
    <group key={stateString}> 
      <mesh
        castShadow //thuộc tính của đối tượng <mesh> trong Three.js. Nếu được thiết lập thành true, nó cho phép đối tượng này phát ra bóng đổ lên các đối tượng khác trong cảnh.
        geometry={nodes.T_Shirt_male.geometry} //để cung cấp hình học (geometry) cho đối tượng
        material={materials.lambert1} //để cung cấp vật liệu (material) cho đối tượng
        material-roughness={1} //để cài đặt độ mờ (roughness) của vật liệu. Giá trị 1 cho độ mờ đầy đủ, trong khi giá trị thấp hơn sẽ tạo ra một bề mặt mịn hơn.
        dispose={null} //nó có thể tham chiếu đến một hàm để giải phóng tài nguyên liên quan đến hình học và vật liệu khi không cần thiết.
      >
        {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]} //vị trí (position) của decal trong không gian 3D.decal được đặt tại vị trí có tọa độ (0, 0, 0), nghĩa là ngay tại tâm của không gian 3D.
            rotation={[0, 0, 0]} // góc quay (rotation) của decal. Decal không có quay và sử dụng góc quay mặc định là (0, 0, 0).
            scale={1} //scale={1}: Đây là tỷ lệ (scale) của decal. Decal có tỷ lệ 1, nghĩa là không bị co hoặc căng ra so với kích thước gốc.
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal //Decal của thư viện Three.js
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16}  //Thuộc tính này thường được sử dụng để cải thiện chất lượng của texture khi được kỹ thuật hóa. Giá trị 16 đề cập đến mức độ anisotropy.
            depthTest={false} //xác định xem depth testing (kiểm tra sâu) có được kích hoạt hay không. Trong trường hợp này, nó được tắt (false), nghĩa là không thực hiện depth testing.
            depthWrite={true} //xác định xem depth writing (ghi sâu) có được kích hoạt hay không. Trong trường hợp này, nó được bật (true), nghĩa là sẽ thực hiện ghi sâu.
          />
        )}
      </mesh>
    </group>
  )
}

export default Shirt
