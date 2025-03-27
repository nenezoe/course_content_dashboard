// import * as buffer from 'buffer';
// (window as any).Buffer = buffer.Buffer;
import ImageUploader from "../../components/ImageUploader";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Toast,
} from "react-bootstrap";
import courseUpload from "../../assets/images/course-upload.svg";
import connectionConfig from "../../ConfigJson";
import imageSvg from "../../assets/images/image.svg";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { ImageFill } from "react-bootstrap-icons";
import { useState, createContext, useRef, useContext, useEffect } from "react";
import { CloudUploadFill } from "react-bootstrap-icons";

import base_url from "../Baseurl";
import axios from "axios";
import { useAlert } from "react-alert";

import * as nearAPI from "near-api-js";
import { useIndexedDB } from "react-indexed-db";
import Nav from "../../components/Nav";

const {
  keyStores,
  connect,
  WalletConnection,
  ConnectedWalletAccount,
  utils,
  Contract,
} = nearAPI;

export const ImgContext = createContext([]);

function CourseSection(props) {
  const {
    index,
    topic,
    onTopicChange,
    content,
    onContentChange,
    onImageChange,
    image,
  } = props;

  const [sections, setSections] = useState([{ topic: "" }]);
  let nee = useRef("");
  let con = useRef("");
  let img = useRef("");

  // const addItem = () => {
  //   setSections([...sections, { topic: "" }]);
  // };

  const handleTopicInputChange = (event) => {
    onTopicChange(index, event.target.value);
    // console.log(index);
  };

  const handleContentChange = (event) => {
    onContentChange(index, event.target.value);
    // console.log(index);
  };

  const handleImageChange = (event) => {
    onImageChange(index, event.target.value);
  };

  // const handleTopicChange = (event, index) => {
  //   const newSections = [...sections];
  //   newSections[index].topic = event.target.value;
  //   setSections(newSections);

  //   // console.log(sections)
  // };

  return (
    <div>
      <h4 className="text-primary mt-5">Section </h4>
      <div className="bg-primary p-4 border-default rounded-4 row">
        <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
          <Form.Label>Topic </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            className="border-default bg-white"
            ref={nee}
            value={topic}
            onChange={handleTopicInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-12" controlId="formBasicEmail">
          <Form.Label>Topic Content </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Topic Content"
            className="border-default bg-white"
            ref={con}
            value={content}
            onChange={handleContentChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold", width: "100%" }}>
            <Alert key={"warning"} variant={"warning"}>
              Upload 1 Image
            </Alert>
          </Form.Label>
          <Form.Label>Image for Section </Form.Label>
          <div className="bg-white p-3">
            <ImageUploader
              ref={img}
              value={image}
              onChange={handleImageChange}
            />
          </div>
        </Form.Group>
      </div>
    </div>
  );
}

let topics;
let contentss;

function QuizSection(props) {
  const db = useIndexedDB("courseData");

  const { index, question, onQuestionChange } = props;
  // const { indexc, content, onContentChange } = props;
  // const [sections, setSections] = useState([{ topic: "" }]);
  let que = useRef("");
  // let con = useRef("");

  const handleQuestionChange = (event) => {
    onQuestionChange(index, event.target.value);
    // console.log(index);
  };

  const handleOpsChange = (event) => {
    onQuestionChange(index, event.target.value);
    // console.log(index);
  };

  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");

  const handleOptionChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const handleCorrectOptionClick = (event, option) => {
    setCorrectOption(option);
  };

  // Add this code to return the updated options array
  const updatedOptions = correctOption
    ? [...options, `correctOption: ${correctOption}`]
    : options;

  // console.log(updatedOptions);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("primary");
  const alert = useAlert();
  return (
    <div className="mb-5">
      <div className="bg-primary p-4 border-default rounded-4 row">
        <Form.Group className="mb-3 col-12" controlId="formBasicEmail">
          <Form.Label>Question </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            className="border-default bg-white"
            ref={que}
            value={question}
            onChange={handleQuestionChange}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
          <Form.Label>Options </Form.Label>
          <Form.Control
            type="text"
            placeholder="Option 1"
            className="border-default bg-white mb-3"
            onChange={(event) => handleOptionChange(event, 0)}
          />
          <Form.Control
            type="text"
            placeholder="Option 2"
            className="border-default bg-white mb-3"
            onChange={(event) => handleOptionChange(event, 1)}
          />
          <Form.Control
            type="text"
            placeholder="Option 3"
            className="border-default bg-white mb-3"
            onChange={(event) => handleOptionChange(event, 2)}
          />
          <Form.Control
            type="text"
            placeholder="Option 4"
            className="border-default bg-white"
            onChange={(event) => handleOptionChange(event, 3)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Row className="mt-4 ">
            <Form.Text className="text-black mb-3">
              The Correct Answer is :
            </Form.Text>
            <Col sm={6} xs={6}>
              <Button
                size=""
                className="btn btn-default mb-3"
                style={{width:"100%"}}
                onClick={(event) => handleCorrectOptionClick(event, options[0])}
              >
                Option 1
              </Button>
            </Col>
            <Col sm={6} xs={6}>
              <Button
                size=""
                className="btn btn-default mb-3"
                style={{width:"100%"}}
                onClick={(event) => handleCorrectOptionClick(event, options[1])}
              >
                Option 2
              </Button>
            </Col>
            <Col sm={6} xs={6}>
              <Button
                size=""
                className="btn btn-default mb-3"
                style={{width:"100%"}}
                onClick={(event) => handleCorrectOptionClick(event, options[2])}
              >
                Option 3
              </Button>
            </Col>
            <Col sm={6} xs={6}>
              <Button
                size=""
                className="btn btn-default mb-3"
                style={{width:"100%"}}
                onClick={(event) => handleCorrectOptionClick(event, options[3])}
              >
                Option 4
              </Button>
            </Col>
            <Col sm={12} xs={12}>
              <Button
                size=""
                style={{width:"100%"}}
                className={`btn btn-${buttonColor} border`}
                disabled={isButtonDisabled}
                onClick={() => {
                  if (
                    question === "" ||
                    options === "" ||
                    correctOption === ""
                  ) {
                    alert.error(
                      "Please fill all field and Choose correct answer",
                      {
                        position: "bottom right",
                        transition: "scale",
                      }
                    );
                  } else {
                    alert.error("Question Saved", {
                      position: "bottom right",
                      transition: "scale",
                    });
                    setIsButtonDisabled(true);
                    setButtonColor("secondary");

                    db.add({
                      questions: question,
                      answers: updatedOptions,
                    })
                      .then((res) => {
                        // console.log("updated sucessfully");
                      })
                      .catch((wrong) => {
                        // console.log(wrong);
                      });
                  }
                }}
              >
                save
              </Button>
            </Col>
          </Row>
        </Form.Group>
        {correctOption && <div>Correct Answer: {correctOption}</div>}
      </div>
    </div>
  );
}

function SingleUpload() {
  // const [sections, setSections] = useState([0]);
  const db = useIndexedDB("courseData");
  const [authorPlaceholder, setAuthorPlaceholder] = useState(
    localStorage.getItem("account_id") || "please connect wallet"
  );
  let db_items;
  const [sections, setSections] = useState([{ topic: "" }]);
  const [contents, setContent] = useState([{ content: "" }]);
  const [quiz, setQuiz] = useState([{ question: "" }]);
  const [image, setImage] = useState([{ image: "" }]);

  useEffect(() => {
    setAuthorPlaceholder(
      localStorage.getItem("account_id") || "please connect wallet"
    );
  });

  const alert = useAlert();
  const addItem = () => {
    setSections([...sections, sections]);
    setContent([...contents, contents]);
  };
  const addQuiz = () => {
    setQuiz([...quiz, quiz]);
    // setOption([...option, option]);
  };

  const [files, setFiles] = useState([]);
  const [summary, setSummary] = useState();
  const [author, setAuthor] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [price, setPrice] = useState();

  let productUri;
  const [numberOfProducts, setNumberOfProducts] = useState();

  // console.log(files);

  const handleTopicChange = (index, value) => {
    const newSections = [...sections];
    newSections[index].topic = value;
    setSections(newSections);
    // console.log(sections.length)
    // console.log(sections[sections.length - 1]);
    // console.log(sections[sections.length-1][sections.length-2])
    let n = sections.length - 1;
    const topicss = [];
    for (let i = 0; i <= n; i++) {
      topicss.push(sections[i].topic);
    }
    // console.log(topics);
    topics = topicss;
  };

  //potential error at contents[i].contents should be contents[i].content

  const handleContentChange = (index, value) => {
    const newContent = [...contents];
    newContent[index].contents = value;
    setContent(newContent);
    let n = contents.length - 1;
    const content = [];
    for (let i = 0; i <= n; i++) {
      content.push(contents[i].contents);
    }
    // console.log(content);
    contentss = content;
  };

  const handleQuestionChange = (index, value) => {
    const newQuestion = [...quiz];
    newQuestion[index].quiz = value;
    setContent(newQuestion);
    let n = quiz.length - 1;
    const questions = [];
    for (let i = 0; i <= n; i++) {
      questions.push(quiz[i].quiz);
    }
    // console.log(questions);
  };

  const handleImageChange = (index, value) => {
    const newImage = [...image];
    newImage[index].quiz = value;
    setImage(newImage);
    let n = quiz.length - 1;
    const questions = [];
    for (let i = 0; i <= n; i++) {
      questions.push(quiz[i].quiz);
    }
    console.log(questions);
  };

  const signedUser = async () => {
    const nearConnection = await connect(connectionConfig);

    const walletConnection = new WalletConnection(nearConnection);
    // setSignedIn(walletConnection.getAccountId() || "Connect Wallet");
    // console.log(walletConnection.getAccountId());
    const account = await nearConnection.account(
      walletConnection.getAccountId()
    );

    const contract = new Contract(
      walletConnection.account(), // the account object that is connecting
      "healthgo-conrse.near",
      {
        // name of contract you're connecting to
        viewMethods: ["read_products"], // view methods do not change state but usually return a value
        changeMethods: ["create_product"], // change methods modify state
      }
    );

    const response = await contract.create_product({
      name: title,
      product_uri: productUri,
      amount_per_unit: price,
      product_type: "course",
      init_available_products: "50000",
    });
  };
  // signedUser();

  // const Process = async () => {
  //   const response = await contract
  //     .create_product({
  //       args: {
  //         name: title,
  //         amount_per_unit: price,
  //         product_uri: productUri,
  //         product_type: "course",
  //         init_available_product: "50000"
  //       }
  //     })
  //     .then((e) => {
  //       console.log(e.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <ImgContext.Provider value={{ files, setFiles }}>
      <div
        className="text-default text-primary text-start my-5"
        style={{ height: "20px" }}
      />
      <Nav />
      <Container className="">
        <div className="text-primary my-5 d-flex ">
          <CloudUploadFill size={50} />
          <h3 className="text-primary" style={{ marginLeft: "10px" }}>
            Category Upload
          </h3>
        </div>
        <div>
          <Card className="no-border">
            <Card.Body className="">
              <Form>
                <div className="row d-flex ">
                  <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                    <Form.Label>
                      <h4 className="text-primary">Course Title</h4>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-3"
                    // style={{ marginTop: "30px" }}
                    controlId="formBasicEmail"
                  >
                    {/* <Form.Label className="text-end">
                      Amount of products
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => {
                        setNumberOfProducts(e.target.value);
                      }}
                    /> */}
                    {/* <Form.Label>Pricing</Form.Label> */}
                    {/* <BootstrapSwitchButton
                      checked={true}
                      width={150}
                      onlabel="Free"
                      offlabel="Paid"
                      onstyle="success"
                      style={{ color: "white" }}
                    /> */}
                  </Form.Group>
                  <Form.Group className="mb-3 col-3" controlId="formBasicEmail">
                    <Form.Label className="text-end">Price in Near</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => {
                        setPrice(utils.format.parseNearAmount(e.target.value));
                        // console.log(price);
                      }}
                    />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <h4 className="text-primary">Author Ticker</h4>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    // rows={3}
                    placeholder={authorPlaceholder}
                    className="border-default bg-primary"
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <h4 className="text-primary">Course Summary</h4>
                  <Form.Control
                    as="textarea"
                    rows={14}
                    className="border-default bg-primary"
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                  />
                </Form.Group>

                {sections.map((item, index) => (
                  <CourseSection
                    key={index}
                    index={index}
                    onTopicChange={handleTopicChange}
                    onContentChange={handleContentChange}
                    onImageChange={handleImageChange}
                    topic={item.topic}
                    content={item.content}
                    image={item.image}
                  />
                ))}
                <div className="row">
                  <div className="col-6 mt-4 d-flex justify-content-between">
                    <Button
                      size=""
                      className="btn btn-default"
                      onClick={addItem}
                    >
                      Add new section
                    </Button>
                  </div>
                </div>

                {/* Beginning of Quiz */}
                <h4 className="text-primary mt-5"> Quiz </h4>
                {quiz.map((item, index) => (
                  <QuizSection
                    key={index}
                    index={index}
                    onQuestionChange={handleQuestionChange}
                    question={item.quiz}
                  />
                ))}
                <div className="row">
                  <div className="col-6 mt-4 d-flex justify-content-between">
                    <Button
                      size=""
                      className="btn btn-default"
                      onClick={addQuiz}
                    >
                      Add Quiz
                    </Button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 mt-4">
                    <Button
                      size="lg"
                      className="btn btn-primary border-default "
                      // disabled
                      onClick={async () => {
                        // console.log("pressed");
                        // console.log(files);
                        const dbItems = await db.getAll().then((e) => {
                          // console.log(e);
                          db_items = e;
                        });

                        console.log({
                          image1: files,
                          title: title,
                          body: summary,
                          quizzes: summary,
                          sections: {
                            course_questions: db_items,
                            course_contents: contentss,
                            course_topics: topics,
                          },
                          author: localStorage.getItem("account_id"),
                        });

                        if (
                          title === undefined ||
                          files === [] ||
                          body === undefined ||
                          price === undefined
                        ) {
                          alert.error("please fill all fields", {
                            position: "bottom right",
                            transition: "scale",
                          });
                        } else {
                          alert.removeAll();
                          alert.info("Hang on, it'll just be a while", {
                            position: "bottom right",
                            transition: "scale",
                            timeout: "100000",
                          });
                          const ipfs = await axios
                            .post(`${base_url}/ipfs/upload-course-to-ipfs`, {
                              image1: files,
                              title: title,
                              body: body,
                              quizzes: summary,
                              sections: {
                                course_questions: db_items,
                                course_contents: contentss,
                                course_topics: topics,
                              },
                              author: localStorage.getItem("account_id"),
                            })
                            .then(async (res) => {
                              db.clear();
                              const stringed = JSON.stringify(res.data.message);
                              const responded = res.data.message;
                              productUri = stringed;
                              alert.removeAll();
                              alert.info("we're almost there, hang on", {
                                position: "bottom right",
                                transition: "scale",
                              });
                              // console.log(res.data.message);

                              // console.log(stringed);
                              // console.log(productUri);

                              // console.log("functioning");
                              setTimeout(async () => {
                                const response = await signedUser()
                                  .then((final) => {
                                    console.log("hold on");
                                    db.clear();
                                  })
                                  .catch((error) => {
                                    db.clear();
                                    console.log("error occured " + error);
                                  });
                              }, 2000);
                            })
                            .catch((err) => {
                              db.clear();
                              alert.removeAll();
                              alert.error("Something went wrong", {
                                position: "bottom right",
                                transition: "scale",
                              });
                              // console.log("final error" + err);
                            });
                        }
                      }}
                    >
                      Upload Course
                    </Button>
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </ImgContext.Provider>
  );
}

export default SingleUpload;
