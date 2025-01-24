const { where } = require("sequelize");
const { Todo, sequelize } = require("../models");

exports.getIndex = (req, res) => {
  res.send("response from api-server : [GET /api-server]");
};

exports.getUser = (req, res) => {
  res.send("response from api-server : [GET /api-server/user]");
};

// ============== todo api 작성 ==============
// 전체 조회 GET /api-server/todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await Todo.findAll();
    console.log(todoAll);
    res.send(todoAll);
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("서버 에러.. 관리자에게 문의 하세요");
  }
};

// todo 하나 추가 POST /api-server/todo
// req.body
exports.addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    await Todo.create({
      text,
    });
    res.send({ isSuccess: true });
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("서버 에러.. 관리자에게 문의 하세요");
  }
};

// todo.done 값 변경 PATCH /api-server/todo/:todoId
// req.params로 id 받음
exports.patchDoneState = async (req, res) => {
  try {
    const { todoId } = req.params;
    const [isUpdated] = await Todo.update(
      { done: sequelize.literal("NOT done") }, // 바꿀 값,
      { where: { id: todoId } } // 찾을 조건
    );

    // [0], [1]
    Boolean(isUpdated)
      ? res.send({ isSuccess: true })
      : res.send({ isSuccess: false }); // 잘못된 todoId를 보내는 경우
  } catch (err) {
    console.log("server err", err);
    res.status(500).send("서버에러.. 관리자에게 문의하세요!");
  }
};

// 수정, 삭제에 대한 api
