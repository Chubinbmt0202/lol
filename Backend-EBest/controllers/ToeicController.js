const ToeicModel = require("../model/ToeicModel");

const addListeningQuestion = async (req, res) => {
  try {
    const newQuestion = req.body;
    console.log("Questions:", newQuestion);

    const content = newQuestion.content;
    const answer = newQuestion.answers;
    const correctAnswer = newQuestion.selectedAnswer;
    const type = newQuestion.typeQuestion;
    const image = newQuestion.imageFiles[0].url;
    const audio = newQuestion.audioFiles[0].url;
    const tag = newQuestion.tag;
    const phan = newQuestion.phan;

    console.log(
      "data:",
      content,
      answer,
      correctAnswer,
      type,
      image,
      audio,
      tag,
      phan
    );

    const result = await ToeicModel.addListeningQuestion(
      content,
      answer,
      correctAnswer,
      type,
      image,
      audio,
      tag,
      phan
    );
    if (!result) {
      throw new Error("Failed to add question");
    }

    res.status(200).json({
      message: "Thêm câu hỏi thành công",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Thêm câu hỏi thất bại", error });
  }
};

const updateListeningQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const newQuestion = req.body;
    console.log("id câu hỏi cần sửa:", id);
    console.log("Questions:", newQuestion);
    const content = newQuestion.content;
    const answer = newQuestion.answers;
    const correctAnswer = newQuestion.selectedAnswer;
    const type = newQuestion.typeQuestion;
    const image = newQuestion.imageFiles[0].url;
    const audio = newQuestion.audioFiles[0].url;
    const tag = newQuestion.tag;
    const phan = newQuestion.phan;
    console.log(
      "data:",
      content,
      answer,
      correctAnswer,
      type,
      image,
      audio,
      tag,
      phan
    );
    const result = await ToeicModel.editListeningQuestion(
      id,
      content,
      answer,
      correctAnswer,
      type,
      image,
      audio,
      tag,
      phan
    );
    if (!result) {
      throw new Error("Failed to update question");
    }
    res.status(200).json({
      message: "Cập nhật câu hỏi thành công",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cập nhật câu hỏi thất bại", error });
  }
};

const deleteListeningQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id câu hỏi cần xóa:", id);
    const result = await ToeicModel.deleteListeningQuestion(id);
    if (!result) {
      throw new Error("Failed to delete question");
    }
    res.status(200).json({
      message: "Xóa câu hỏi thành công",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Xóa câu hỏi thất bại", error });
  }
};

const getListeningQuestions = async (req, res) => {
  try {
    const result = await ToeicModel.getListeningQuestions();
    console.log("tất cả câu hỏi", result);
    if (!result) {
      throw new Error("Failed to get question");
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lấy câu hỏi thất bại", error });
  }
};

// phần câu hỏi hỏi đáp

const getTalkQuestions = async (req, res) => {
  try {
    const result = await ToeicModel.getAllTalkQuestions();
    console.log("tất cả câu hỏi hỏi đáp", result);
    if (!result) {
      throw new Error("Failed to get question");
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lấy câu hỏi hỏi đáp thất bại", error });
  }
};

const addTalkQuestion = async (req, res) => {
  try {
    const newQuestion = req.body;
    const audioLinkUrls = newQuestion.audioLinkUrls;
    const content = newQuestion.content;
    const answer = newQuestion.answers;
    const correctAnswer = newQuestion.selectedAnswer;
    const type = newQuestion.typeQuestion;
    const tag = newQuestion.tag;
    const phan = newQuestion.phan;
    console.log("data:", content, answer, audioLinkUrls, correctAnswer, type, tag, phan);
    const newQuestionSent = {
      content,
      answer,
      audioLinkUrls,
      correctAnswer,
      type,
      tag,
      phan,
    }
    const result = await ToeicModel.addTalkQuestion(
      newQuestionSent
    );
    if (!result) {
      throw new Error("Failed to add question");
    }
    res.status(200).json({
      message: "Thêm câu hỏi thành công",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Thêm câu hỏi thất bại", error });
  }
};

const addMultipleCauHoi = async (req, res) => {
  const cauHoiList = req.body;
  console.log("Questions:", cauHoiList);
  ToeicModel.addMultipleCauHoi(cauHoiList, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res
      .status(200)
      .json({ message: "Thêm nhiều câu hỏi thành công", data: results });
  });
};

const getAllQuestionToeic = async (req, res) => {
  try {
    const result = await ToeicModel.getAllQuestionToeic();
    if (!result) {
      throw new Error("Failed to get question");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Lấy câu hỏi thất bại", error });
  }
};

const deleteQuestionTalkToeic = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id câu hỏi hỏi đáp cần xóa:", id);
    const result = await ToeicModel.deleteTalkQuestion(id);
    if (!result) {
      throw new Error("Failed to delete question");
    }
    res.status(200).json({
      message: "Xóa câu hỏi thành công",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Xóa câu hỏi thất bại", error });
  }
}

const addQuestionShortTalk = async (req, res) => {
  try {
    const newQuestion = req.body;
    const audioFiles = newQuestion.audioFiles.map(file => file.url).join(',');
    const imageFiles = newQuestion.imageFiles.map(file => file.url).join(',');
    const content = newQuestion.content;
    const questions = newQuestion.questions.map(q => ({
      id: q.id,
      content: q.content,
      answers: q.answers,
      correctAnswer: q.correctAnswer
    }));
    const tag = newQuestion.tag;
    const loai = newQuestion.loai;
    const phan = newQuestion.phan;

    const luaChon = JSON.stringify(questions.map(q => q.answers));
    const dapAnDung = JSON.stringify(questions.map(q => q.correctAnswer));
    const cauHoiCon = JSON.stringify(questions);

    // Assuming ToeicModel.addQuestionShortTalk can handle the new parameters
    const result = await ToeicModel.addShortTalkQuestion(
      imageFiles,
      audioFiles,
      content,
      tag,
      luaChon,
      dapAnDung,
      loai,
      phan,
      cauHoiCon
    );

    if (!result) {
      throw new Error("Failed to add question");
    }
    res.status(200).json({
      message: "Thêm câu hỏi thành công",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Thêm câu hỏi thất bại", error });
  }
};

const getAllTalkShortQuestions = async (req, res) => {
  try {
    const result = await ToeicModel.getAllTalkShortQuestions();
    if (!result) {
      throw new Error("Failed to get question");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Lấy câu hỏi thất bại", error });
  }
};

const addQuestionChuyenNgan = async (req, res) => {
  try {
    const newQuestion = req.body;
    const audioFiles = newQuestion.audioFiles.map(file => file.url).join(',');
    const imageFiles = newQuestion.imageFiles.map(file => file.url).join(',');
    const content = newQuestion.content;
    const questions = newQuestion.questions.map(q => ({
      id: q.id,
      content: q.content,
      answers: q.answers,
      correctAnswer: q.correctAnswer
    }));
    const tag = newQuestion.tag;
    const loai = newQuestion.loai;
    const phan = newQuestion.phan;

    const luaChon = JSON.stringify(questions.map(q => q.answers));
    const dapAnDung = JSON.stringify(questions.map(q => q.correctAnswer));
    const cauHoiCon = JSON.stringify(questions);

    // Assuming ToeicModel.addQuestionShortTalk can handle the new parameters
    const result = await ToeicModel.addQuestionChuyenNgan(
      imageFiles,
      audioFiles,
      content,
      tag,
      luaChon,
      dapAnDung,
      loai,
      phan,
      cauHoiCon
    );

    if (!result) {
      throw new Error("Failed to add question");
    }
    res.status(200).json({
      message: "Thêm câu hỏi thành công",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Thêm câu hỏi thất bại", error });
  }
}

const getAllChuyenNganQuestions = async (req, res) => {
  try {
    const result = await ToeicModel.getAllChuyenNganQuestions();
    if (!result) {
      throw new Error("Failed to get question");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Lấy câu hỏi thất bại", error });
  }
};

const addQuestionDienCau = async (req, res) => {
  try {
    const newQuestion = req.body;    
  console.log("Questions:", newQuestion);
  const { content, answers, correctAnswer, parentName, tag, phan, loai } = newQuestion;
  console.log("data chi tiết:", content, answers, correctAnswer, parentName, tag, phan, loai);

    const result = await ToeicModel.addQuestionDienVaoCau(content, answers, correctAnswer, parentName, tag, phan, loai);
    if (!result) {
      throw new Error("Failed to add question");
    }
    res.status(200).json({
      message: "Thêm câu hỏi thành công",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Thêm câu hỏi thất bại", error });
  }
}

const getAllQuestionDienCau = async (req, res) => {
  try {
    const result = await ToeicModel.getAllQuestionDienVaoCau();
    if (!result) {
      throw new Error("Failed to get question");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Lấy câu hỏi thất bại", error });
  }
};

const addQuestionDienVaoDoan = async (req, res) => {
  try {
    const newQuestion = req.body;
    const {CauHoi, Tag, DeBai, phan, loai, CauHoiCon} = newQuestion;
    console.log("Câu hỏi:", CauHoi);
    console.log("Tag:", Tag);
    console.log("Đề bài:", DeBai);
    console.log("Phần:", phan);
    console.log("Loại:", loai);
    console.log("Câu hỏi con:", CauHoiCon);
    // console.log("Questions điền vào đoạn:", newQuestion);
    const result = await ToeicModel.addQuestionDienVaoDoan(CauHoi, Tag, DeBai, phan, loai, CauHoiCon);

    if (!result) {
      throw new Error("Failed to add question");
    }
    res.status(200).json({
      message: "Thêm câu hỏi thành công",
      data: result,
    });

  }
  catch (error) {
    res.status(500).json({ message: "Thêm câu hỏi thất bại", error });
  }
}

const getAllQuestionDienVaoDoan = async (req, res) => {
  try {
    const result = await ToeicModel.getAllQuestionDienVaoDoan();
    if (!result) {
      throw new Error("Failed to get question");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Lấy câu h��i thất bại", error });
  }
};

const addQuestionDocHieu = async (req, res) => {
  try {
    const newQuestion = req.body;
    const {CauHoi, Tag, DeBai, phan, loai, CauHoiCon} = newQuestion;
    console.log("Câu hỏi:", CauHoi);
    console.log("Tag:", Tag);
    console.log("Đề bài:", DeBai);
    console.log("Phần:", phan);
    console.log("Loại:", loai);
    console.log("Câu hỏi con:", CauHoiCon);
    // console.log("Questions điền vào đoạn:", newQuestion);
    const result = await ToeicModel.addQuestionDocHieu(CauHoi, Tag, DeBai, phan, loai, CauHoiCon);

    if (!result) {
      throw new Error("Failed to add question");
    }
    res.status(200).json({
      message: "Thêm câu hỏi thành công",
      data: result,
    });

  }
  catch (error) {
    res.status(500).json({ message: "Thêm câu hỏi thất bại", error });
  }
}

const getAllQuestionDocHieu = async (req, res) => {
  try {
    const result = await ToeicModel.getAllQuestionDocHieu();
    if (!result) {
      throw new Error("Failed to get question");
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Lấy câu h��i thất bại", error });
  }
};

const getAllQuestion = async (req, res) => {
  try {
    const result = await ToeicModel.getAllQuestion();
    if (!result) {
      throw new Error("Failed to get question");
    }
    res.status(200).json({
      message: "Lấy câu hỏi thành công",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Lấy câu h��i thất bại", error });
  }
};

module.exports = {
  addListeningQuestion,
  getAllQuestionToeic,
  deleteListeningQuestion,
  getListeningQuestions,
  addMultipleCauHoi,
  updateListeningQuestion,
  addTalkQuestion,
  getTalkQuestions,
  deleteQuestionTalkToeic,
  addQuestionShortTalk,
  getAllTalkShortQuestions,
  addQuestionChuyenNgan,
  getAllChuyenNganQuestions,
  addQuestionDienCau,
  getAllQuestionDienCau,
  addQuestionDienVaoDoan,
  getAllQuestionDienVaoDoan,
  addQuestionDocHieu,
  getAllQuestionDocHieu,
  getAllQuestion,
};
