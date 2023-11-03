import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai"; //Configuration có thể là một cấu hình hoặc cài đặt cho việc sử dụng API, và OpenAIApi có thể là một đối tượng hoặc giao diện được cung cấp bởi gói openai

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from TK2 ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({ // tạo hình ảnh thông qua API của OpenAI.
      prompt, //prompt có thể là một đoạn văn bản, một câu hỏi hoặc bất kỳ nội dung mô tả nào có thể hướng dẫn việc tạo hình ảnh.
      n: 1,  //n: 1: Tham số n chỉ định số lượng hình ảnh cần tạo. Trong trường hợp này, n được đặt là 1, tức là yêu cầu tạo một hình ảnh.
      size: '1024x1024',
      response_format: 'b64_json' //phản hồi sẽ là một chuỗi base64 đại diện cho hình ảnh và định dạng JSON
    });

    const image = response.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;