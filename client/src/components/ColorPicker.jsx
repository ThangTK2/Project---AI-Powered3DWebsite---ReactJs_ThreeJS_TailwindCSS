import { SketchPicker } from 'react-color' // tạo ra một giao diện để người dùng có thể chọn màu sắc.
import { useSnapshot } from 'valtio'  //valtio: thư viện quản lý trạng thái 
import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker //<SketchPicker> từ thư viện 'react-color' để tạo ra một giao diện cho người dùng chọn màu sắc.
        color={snap.color}
        disableAlpha  //disableAlpha: Thuộc tính này có thể được sử dụng để tắt khả năng chọn độ trong suốt (alpha channel). 
        onChange={(color) => state.color = color.hex} //là một hàm callback được gọi khi người dùng thay đổi màu sắc trong bảng chọn.
      />
    </div>
  )
}

export default ColorPicker