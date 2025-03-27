// import {
//   Button,
//   Card,
//   Col,
//   Container,
//   Form,
//   Image,
//   Row,
// } from "react-bootstrap";

// import Alert from "react-bootstrap/Alert";
// // import { useAlert } from "react-alert";
// import productUpload from "../assets/images/product-upload.svg";
// import connectionConfig from "../ConfigJson";
// import BootstrapSwitchButton from "bootstrap-switch-button-react";
// import ImageUpload from "../components/ImageUpload";
// import { useState, createContext, useEffect } from "react";
// import { encode, decode } from "base64-arraybuffer";
// import base_url from "./Baseurl";

// import resizer from "image-resizer-js";

// import { useAlert } from "react-alert";
// import * as nearAPI from "near-api-js";

// const {
//   keyStores,
//   connect,
//   WalletConnection,
//   ConnectedWalletAccount,
//   utils,
//   Contract,
// } = nearAPI;

// import axios from "axios";

// import Nav from "../components/Nav";

// export const ImageContext = createContext([]);
// function ProductUpload() {
//   const alert = useAlert();
//   const [productName, setProductName] = useState();
//   const [price, setPrice] = useState();
//   const [image1, setImage1] = useState();
//   const [image2, setImage2] = useState();
//   const [image3, setImage3] = useState();
//   const [productDescription, setProductDescription] = useState();
//   let productUri;
//   const [productAmount, setProductAmount] = useState();

//   const [files, setFiles] = useState([]);
//   console.log(files?.name);
//   // files?.map((e) => console.log(e.name));
//   const assignFiles = async () => {
//     setImage1(files[0]);
//     setImage2(files[1]);
//     setImage3(files[2]);

//     // console.log(files[0]);
//     // console.log(files[1]);
//     // console.log(files[2]);
//   };

//   useEffect(() => {
//     console.log(files);
//     assignFiles();
//   }, files);

//   const signedUser = async () => {
//     const nearConnection = await connect(connectionConfig);
//     const walletConnection = new WalletConnection(nearConnection);
//     // setSignedIn(walletConnection.getAccountId() || "Connect Wallet");
//     console.log(walletConnection.getAccountId());
//     const account = await nearConnection.account(
//       walletConnection.getAccountId()
//     );

//     const contract = new Contract(
//       walletConnection.account(), // the account object that is connecting
//       "healthgo-prodnct.near",
//       {
//         // name of contract you're connecting to
//         viewMethods: ["read_products"], // view methods do not change state but usually return a value
//         changeMethods: ["create_product"], // change methods modify state
//       }
//     );

//     const response = await contract.create_product({
//       name: productName,
//       product_uri: productUri,
//       amount_per_unit: price,
//       product_type: "product",
//       init_available_products: productAmount,
//     });
//   };

//   return (
//     <ImageContext.Provider value={{ files, setFiles }}>
//       <Container className="">
        
//           <div className="text-default text-primary text-start my-5" style={{height:"20px"}} />
//        <Nav />
//         <div className="text-primary my-5 d-flex ">
//           <Image
//             width={50}
//             src={productUpload}
//             className=""
//             style={{ margin: "0 20px 10px 0" }}
//           />
//           <h3 className="text-primary">Product Upload</h3>
//         </div>
//         <div>
//           <Card className="no-border">
//             <Card.Body className="">
//               <Form>
//                 <div className="row d-flex ">
//                   <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
//                     <Form.Label>Product Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder=""
//                       className="border-default bg-primary"
//                       onChange={(e) => {
//                         setProductName(e.target.value);
//                       }}
//                     />
//                   </Form.Group>
//                   <Form.Group
//                     className="mb-3 col-3"
//                     // style={{ marginTop: "30px" }}
//                     controlId="formBasicEmail"
//                   >
//                     <Form.Label className="text-end">
//                       Amount of products
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder=""
//                       className="border-default bg-primary"
//                       onChange={(e) => {
//                         setProductAmount(e.target.value);
//                       }}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3 col-3" controlId="formBasicEmail">
//                     <Form.Label className="text-end">Price in Near</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder=""
//                       className="border-default bg-primary"
//                       onChange={(e) => {
//                         setPrice(utils.format.parseNearAmount(e.target.value));
//                       }}
//                     />
//                   </Form.Group>
//                 </div>

//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                   <Form.Label>Product Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     className="border-default bg-primary"
//                     onChange={(e) => {
//                       setProductDescription(e.target.value);
//                     }}
//                   />
//                 </Form.Group>

//                 <div className="warning">
//                   <Alert key={"warning"} variant={"warning"}>
//                     Drag/Select to Upload Three (3) Images at the same time
//                   </Alert>
//                 </div>
//                 <div className="row d-flex ">
//                   <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
//                     <Form.Label>Product Images</Form.Label>
//                     <div className="bg-white p-3">
//                       <ImageUpload />
//                     </div>
//                   </Form.Group>
//                   {/* <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
//                     <Form.Label>Product URI</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder=""
//                       className="border-default bg-primary"
//                       onChange={(e) => {
//                         setProductUri(e.target.value);
//                       }}
//                     />
//                   </Form.Group> */}
//                 </div>

//                 <div className="mt-4">
//                   <Button
//                     size="lg"
//                     className="border-default"
//                     onClick={async () => {
//                       console.log("pressed");
//                       if (
//                         productName === undefined ||
//                         files === [] ||
//                         productDescription === undefined ||
//                         price === undefined ||
//                         productAmount === undefined
//                       ) {
//                         alert.error("please fill all fields", {
//                           position: "bottom right",
//                           transition: "scale",
//                         });
//                       } else {
//                         alert.removeAll();
//                         alert.info("Hang on, it'll just be a while", {
//                           position: "bottom right",
//                           transition: "scale",
//                           timeout: "100000",
//                         });
//                         const ipfs = await axios
//                           .post(`${base_url}/ipfs/upload-product-to-ipfs`, {
//                             image1: image1,
//                             image2: image2,
//                             image3: image3,
//                             description: productDescription,
//                           })
//                           .then(async (res) => {
//                             const stringed = JSON.stringify(res.data.message);
//                             const responded = res.data.message;
//                             productUri = stringed;
//                             alert.removeAll();
//                             alert.info("we're almost there, hang on", {
//                               position: "bottom right",
//                               transition: "scale",
//                             });
//                             console.log(res.data.message);

//                             console.log(stringed);
//                             console.log(productUri);

//                             console.log("functioning");
//                             setTimeout(async () => {
//                               const response = await signedUser()
//                                 .then((final) => {
//                                   console.log("hold on");
//                                 })
//                                 .catch((error) => {
//                                   console.log("error occured " + error);
//                                 });
//                             }, 2000);
//                           })
//                           .catch((err) => {
//                             alert.removeAll();
//                             alert.error("Something went wrong", {
//                               position: "bottom right",
//                               transition: "scale",
//                             });
//                             console.log("final error" + err);
//                           });
//                       }
//                     }}
//                   >
//                     Upload Product
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </div>
//       </Container>
//     </ImageContext.Provider>
//   );
// }

// export default ProductUpload;




import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import erc20abi from '../erc20ABI.json';

import Alert from "react-bootstrap/Alert";
// import { useAlert } from "react-alert";
import productUpload from "../assets/images/product-upload.svg";
import connectionConfig from "../ConfigJson";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import ImageUpload from "../components/ImageUpload";
import { useState, createContext, useEffect } from "react";
import { encode, decode } from "base64-arraybuffer";
import base_url from "./Baseurl";
import { createHelia } from "helia";
import axios from "axios";
import Web3 from "web3";

import resizer from "image-resizer-js";

import { useAlert } from "react-alert";
// import * as nearAPI from "near-api-js";
import { create } from "ipfs-http-client";
import Nav from "../components/Nav";
// import  ethers  from "ethers";
import { json } from '@helia/json'



const helia =  createHelia()
const j = json(helia)

// const myImmutableAddress = await j.add({ hello: 'world' })

// console.log(await j.get(myImmutableAddress))
// console.log(myImmutableAddress);
// { hello: 'world' }



const contractAddress = "0xF9b75C473597F480D06D59C1f918855242ddc000";

// const contract = new ethers.Contract(contractAddress, contractAbi, signer);

// Initialize Web3 with a provider (e.g., an Ethereum node URL)
// const web3 = new Web3("https://rpc-mumbai.maticvigil.com/");

const web3 = new Web3(
  "https://gateway.testnet.octopus.network/ottochain/m4k5urt9h33dpbhgsp4lqxemo6naeihz"
);

const contract = new web3.eth.Contract(erc20abi, contractAddress);



 const readData =  () =>
  contract.methods
    .getAllProducts()    .call()
    .then((result) => {
      console.log("Result:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });


    console.log( 'rewfgty', readData());

const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

// const {
//   keyStores,
//   connect,
//   WalletConnection,
//   ConnectedWalletAccount,
//   utils,
//   Contract,
// } = nearAPI;







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
  const [productCategory, setProductCategory] = useState();
  const [productSubcategory, setProductSubcategory] = useState();

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

  function generateUniqueId() {
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomValue = Math.floor(Math.random() * 1000); // Generate a random value
  
    // Combine the timestamp and random value to create a unique ID
    const uniqueId = `${timestamp}-${randomValue}`;
  
    return uniqueId;
  }

  // const handleSubmit = (e) => {
  //   e.preventDefaulr();
  //   const data = new FormData(e.target);
  //   const provider = new ethers.providers.web3Provider(window.ethereum);
  //   const erc20 = new ethers.Contract(data.get("addr"), erc20abi, provider);
    
  // }

  

  const handleSubmit = async (e, productName, productDescription,imageUrls, productId, productCategory, productSubcategory, price) => {
    // e.preventDefault();
  
    try {
      // Collect the product data
      const name = productName;
      const description = productDescription;
      const image = imageUrls; // Use the IPFS URL or another URL for the image
      const productId = ''; // Replace with a unique product ID
      const categoryName = productCategory;
      const subCategory = productSubcategory; // Replace with the subcategory
      const price = '';
  
      // Ensure all required fields are collected
  
      // if (
      //   !name ||
      //   !description ||
      //   !image ||
      //   // !productId ||
      //   !categoryName ||
      //   !subCategory ||
      //   !price
      // ) {
      //   alert.error("Please fill in all fields");
      //   return;
      // }
  
      const web3Provider = new Web3(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const erc20 = new ethers.Contract("0xF9b75C473597F480D06D59C1f918855242ddc000", erc20abi, provider);
      // Now you can interact with the smart contract
      const contractAddress = "0xF9b75C473597F480D06D59C1f918855242ddc000";
      const erc20 = new web3Provider.eth.Contract(erc20abi, contractAddress);
      // const getproduct = await erc20.methods.getAllProducts();
      // console.log(getproduct());

      const newTrasaction = await  contract.methods.createProduct(
        'name',
        'description',
        'imageUrls',
        896597609,
        // 'generateUniqueId()', // Replace with a unique product ID
        'productCategory',
        'productSubcategory',
        5676
        // 'price'
      ).send({ from: "0x048bbF0Ed27699A99705256e235e42014aD301d0" });
      // .call();
      console.log(newTrasaction());

     
      // const transaction = await erc20.methods
      //   .createProduct(
      //    name,
      //   description,
      //   imageUrls,
      //   generateUniqueId(), // Replace with a unique product ID
      //   productCategory,
      //   productSubcategory,
      //   price
      //     // name,
      //     // description,
      //     // image,
      //     // productId,
      //     // categoryName,
      //     // subCategory,
      //     // price
      //   )
      //   .send({ from: "0x048bbF0Ed27699A99705256e235e42014aD301d0" }); // Replace with your sender's Ethereum address
  
      // console.log("Transaction Hash:", transaction.transactionHash);
      alert.success("Product created successfully!");
    } catch (error) {
      console.error("Contract interaction error:", error);
      alert.error("Error creating the product. Please try again.");
    }
  };
  


  // const uploadToIPFS = async (images) => {
  //   const formData = new FormData();
  
  //   images.forEach((image, index) => {
  //     formData.append(`image${index + 1}`, image);
  //   });
  
  //   try {
  //     const response = await axios.post("https://ipfs.infura.io:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVENTU4RGY4MDQ2YTE3NWNGYTNhNmVkODU4NjE4Qzk4RDVmY2NhREEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTY5MDc5NjYyODQsIm5hbWUiOiJrbG9zYV9maXJzdF9hcGl0b2tlbiJ9._rMSFy_kLcZbbBNneoCFuedLWRTky0QYpPawNO_pacY", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  
  //     if (response.data && response.data.Hash) {
  //       const ipfsHash = response.data.Hash;
  //       return ipfsHash;
  //     } else {
  //       // Handle error
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("IPFS upload error:", error);
  //     return null;
  //   }
  // };


  const uploadToHelia = async (images) => {
    try {
      const heliaUrls = [];
      await Promise.all(
        images.map(async (image) => {
          const buffer = image.buffer; // Assuming your ImageUpload component provides a buffer
          const heliaResponse = await createHelia.upload(buffer);
          heliaUrls.push(heliaResponse.url);
        })
      );
      return heliaUrls;
    } catch (error) {
      console.error("Helia upload error:", error);
      return null;
    }
  };


  const uploadToIPFS = async (images) => {
    try {
      const ipfsUrls = [];
      await Promise.all(
        images.map(async (image) => {
          const buffer = image.buffer; // Assuming your ImageUpload component provides a buffer
          const { cid } = await ipfs.add(buffer);
          ipfsUrls.push(`https://ipfs.io/ipfs/${cid.toString()}`);
        })
      );
      return ipfsUrls;
    } catch (error) {
      console.error("IPFS upload error:", error);
      return null;
    }
  };
  

  // const signedUser = async () => {
  //   const nearConnection = await connect(connectionConfig);
  //   const walletConnection = new WalletConnection(nearConnection);
  //   // setSignedIn(walletConnection.getAccountId() || "Connect Wallet");
  //   console.log(walletConnection.getAccountId());
  //   const account = await nearConnection.account(
  //     walletConnection.getAccountId()
  //   );


    // const contract = new Contract(
    //   walletConnection.account(), // the account object that is connecting
    //   "healthgo-prodnct.near",
    //   {
    //     // name of contract you're connecting to
    //     viewMethods: ["read_products"], // view methods do not change state but usually return a value
    //     changeMethods: ["create_product"], // change methods modify state
    //   }
    // );

  //   const response = await contract.create_product({
  //     name: productName,
  //     product_uri: productUri,
  //     amount_per_unit: price,
  //     product_type: "product",
  //     init_available_products: productAmount,
  //   });
  // };

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
                    <Form.Label className="text-end">Price in Ethereum </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => {
                        const ethValue = ethers.utils.parseEther(e.target.value);
                        setPrice(ethValue);
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="row d-flex ">
                <Form.Group
                    className="mb-3 col-3"
                    // style={{ marginTop: "30px" }}
                    controlId="formBasicEmail"
                  >
                    <Form.Label className="text-end">
                      Product Category
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => {                      
                         setProductCategory(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-3" controlId="formBasicEmail">
                    <Form.Label className="text-end">Product Subcategory</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="border-default bg-primary"
                      onChange={(e) => {
                        setProductSubcategory(e.target.value); 
                        // setPrice(utils.format.parseNearAmount(e.target.value));
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
                      // if (
                      //   productName === undefined ||
                      //   (files.length === 0 && (image1 === undefined || image2 === undefined || image3 === undefined)) || // Require at least one image
                      //   productDescription === undefined ||
                      //   price === undefined
                      // ) {
                      //   alert.error("Please fill all fields and select at least one image", {
                      //     position: "bottom right",
                      //     transition: "scale",
                      //   });
                      // } else {
                      //   alert.removeAll();
                      //   alert.info("Hang on, it'll just be a while", {
                      //     position: "bottom right",
                      //     transition: "scale",
                      //     timeout: "100000",
                      //   });
                  
                        const selectedImages = [image1, image2, image3].filter((image) => image !== undefined);
                  
                        // const uploadedImageUrls = await uploadToIPFS(selectedImages);
                        // const uploadedImageUrls = await uploadToHelia(selectedImages);
                        // if (uploadedImageUrls) {
                          // At least one image uploaded to IPFS successfully, now you can proceed
                          // const name = productName;
                          // const description = productDescription;
                          // const imageUrls = uploadedImageUrls;
                          // const productId = productId;
                          // const productCategory = productCategory;
                          // const productSubcategory = productSubcategory;
                          // const productPrice = price;
                          console.log('handle submit');
                          handleSubmit()
                          // handleSubmit(null, name, description, imageUrls, productId, productCategory, productSubcategory, productPrice);
                          // Now you can use these values for your contract interactions
                        // } else {
                        //   alert.removeAll();
                        //   alert.error("Something went wrong during IPFS upload", {
                        //     position: "bottom right",
                        //     transition: "scale",
                        //   });
                        // }
                      // }
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

