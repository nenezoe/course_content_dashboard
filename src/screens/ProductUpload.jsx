import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";

import Alert from "react-bootstrap/Alert";
// import { useAlert } from "react-alert";
import productUpload from "../assets/images/product-upload.svg";
import connectionConfig from "../ConfigJson";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import ImageUpload from "../components/ImageUpload";
import { useState, createContext, useEffect } from "react";
import { encode, decode } from "base64-arraybuffer";
import base_url from "./Baseurl";

import resizer from "image-resizer-js";

import { useAlert } from "react-alert";
import * as nearAPI from "near-api-js";

const {
  keyStores,
  connect,
  WalletConnection,
  ConnectedWalletAccount,
  utils,
  Contract,
} = nearAPI;

import axios from "axios";

import Nav from "../components/Nav";

export const ImageContext = createContext([]);
function ProductUpload() {
  const alert = useAlert();
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [productDescription, setProductDescription] = useState();
  let productUri;
  const [productAmount, setProductAmount] = useState();

  const [files, setFiles] = useState([]);
  console.log(files?.name);
  // files?.map((e) => console.log(e.name));
  const assignFiles = async () => {
    setImage1(files[0]);
    setImage2(files[1]);
    setImage3(files[2]);

    // console.log(files[0]);
    // console.log(files[1]);
    // console.log(files[2]);
  };

  useEffect(() => {
    console.log(files);
    assignFiles();
  }, files);

  const signedUser = async () => {
    const nearConnection = await connect(connectionConfig);
    const walletConnection = new WalletConnection(nearConnection);
    // setSignedIn(walletConnection.getAccountId() || "Connect Wallet");
    console.log(walletConnection.getAccountId());
    const account = await nearConnection.account(
      walletConnection.getAccountId()
    );

    const contract = new Contract(
      walletConnection.account(), // the account object that is connecting
      "healthgo-prodnct.near",
      {
        // name of contract you're connecting to
        viewMethods: ["read_products"], // view methods do not change state but usually return a value
        changeMethods: ["create_product"], // change methods modify state
      }
    );

    const response = await contract.create_product({
      name: productName,
      product_uri: productUri,
      amount_per_unit: price,
      product_type: "product",
      init_available_products: productAmount,
    });
  };

  return (
    <ImageContext.Provider value={{ files, setFiles }}>
      <Container className="">
        
          <div className="text-default text-primary text-start my-5" style={{height:"20px"}} />
       <Nav />
        <div className="text-primary my-5 d-flex ">
          <Image
            width={50}
            src={productUpload}
            className=""
            style={{ margin: "0 20px 10px 0" }}
          />
          <h3 className="text-primary">Product Upload</h3>
        </div>
        <div>
          <Card className="no-border">
            <Card.Body className="">
              <Form>
                <div className="row d-flex ">
                  <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 col-3"
                    // style={{ marginTop: "30px" }}
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="text-end">
                      Amount of products
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => {
                        setProductAmount(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-3" controlId="formBasicEmail">
                    <Form.Label className="text-end">Price in Near</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => {
                        setPrice(utils.format.parseNearAmount(e.target.value));
                      }}
                    />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    className="border-default bg-primary"
                    onChange={(e) => {
                      setProductDescription(e.target.value);
                    }}
                  />
                </Form.Group>

                <div className="warning">
                  <Alert key={"warning"} variant={"warning"}>
                    Drag/Select to Upload Three (3) Images at the same time
                  </Alert>
                </div>
                <div className="row d-flex ">
                  <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                    <Form.Label>Product Images</Form.Label>
                    <div className="bg-white p-3">
                      <ImageUpload />
                    </div>
                  </Form.Group>
                  {/* <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                    <Form.Label>Product URI</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => {
                        setProductUri(e.target.value);
                      }}
                    />
                  </Form.Group> */}
                </div>

                <div className="mt-4">
                  <Button
                    size="lg"
                    className="border-default"
                    onClick={async () => {
                      console.log("pressed");
                      if (
                        productName === undefined ||
                        files === [] ||
                        productDescription === undefined ||
                        price === undefined ||
                        productAmount === undefined
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
                          .post(`${base_url}/ipfs/upload-product-to-ipfs`, {
                            image1: image1,
                            image2: image2,
                            image3: image3,
                            description: productDescription,
                          })
                          .then(async (res) => {
                            const stringed = JSON.stringify(res.data.message);
                            const responded = res.data.message;
                            productUri = stringed;
                            alert.removeAll();
                            alert.info("we're almost there, hang on", {
                              position: "bottom right",
                              transition: "scale",
                            });
                            console.log(res.data.message);

                            console.log(stringed);
                            console.log(productUri);

                            console.log("functioning");
                            setTimeout(async () => {
                              const response = await signedUser()
                                .then((final) => {
                                  console.log("hold on");
                                })
                                .catch((error) => {
                                  console.log("error occured " + error);
                                });
                            }, 2000);
                          })
                          .catch((err) => {
                            alert.removeAll();
                            alert.error("Something went wrong", {
                              position: "bottom right",
                              transition: "scale",
                            });
                            console.log("final error" + err);
                          });
                      }
                    }}
                  >
                    Upload Product
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </ImageContext.Provider>
  );
}

export default ProductUpload;
