import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CSpinner } from "@coreui/react";

// routes config
import routes from "../routes";
import Dashboard from "../screens/Dashboard";
import { Container } from "react-bootstrap";
import ProductUpload from "../screens/ProductUpload";
import CourseUpload from "../screens/CourseUpload/SingleUpload";

/* import Dashboard from '../screens/dashboard/Dashboard'; */

const Content = () => {
  return (
    <Container className="">
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product-upload" element={<ProductUpload />} />
          <Route path="/upload/course" element={<CourseUpload />} />
        </Routes>
      </Suspense>
    </Container>
  );
};

export default React.memo(Content);
