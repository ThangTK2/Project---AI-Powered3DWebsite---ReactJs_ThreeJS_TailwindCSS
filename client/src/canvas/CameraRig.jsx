import { useRef } from 'react'; //tham chiếu đến một phần tử DOM hoặc một giá trị có thể thay đổi trong một thành phần React.
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath'; //thư viện tương tự để điều chỉnh giá trị của thuộc tính quay (rotation) của một đối tượng trong một cảnh 3D.
import { useSnapshot } from 'valtio';

import state from '../store';

// eslint-disable-next-line react/prop-types
const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => { //useFrame là một hook trong thư viện @react-three/fiber dành cho React.js. Nó được sử dụng để cập nhật và vẽ lại cảnh 3D trong mỗi khung hình của ứng dụng.
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if(snap.intro) {
      if(isBreakpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }

    // set model camera position
    //easing.damp3 có thể được sử dụng để làm dịu quá trình chuyển đổi giữa vị trí camera hiện tại và vị trí mục tiêu. Hiệu ứng dịu dàng giúp kiểm soát tốc độ của quá trình chuyển đổi này, tạo ra một animation mượt mà hơn.
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)


    // set the model rotation smoothly
    easing.dampE(  //easing.dampE: thư viện 'maath' để áp dụng hiệu ứng giảm dần (damping)
      group.current.rotation, //group.current.rotation: thuộc tính quay (rotation) của một nhóm (group) trong một cảnh 3D. 
      [state.pointer.y / 10, -state.pointer.x / 5, 0], //xác định góc quay theo các trục x, y, và z.
      0.25,  // để điều chỉnh tốc độ damping (giảm dần). Damping (trong trường hợp này, được áp dụng cho quá trình quay) giúp giảm dần vận tốc của đối tượng, tạo ra một hiệu ứng giảm dần.
      delta //tham số thời gian, có thể là khoảng thời gian giữa các khung hình trong một animation. Thông thường, delta được sử dụng để điều chỉnh tốc độ của các thay đổi trong quá trình animation.
    )
  })

  return <group ref={group}>{children}</group>
}

export default CameraRig
