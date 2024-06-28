import React from "react";

import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router-dom";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    width: "100vw",
    height: "1000px",
  },
  section: {
    margin: 10,
    padding: 10,
    // flexGrow: 1,
  },
});

export const Invoice = () => {
  const { state: data } = useLocation();
  let total = data.totalWeight * data.numberOfUnits * 47;
  const navigate = useNavigate();
  return (
    <>
      <header style={{ height: "70vh" }}>
        <div className="content h-100 bg-black bg-opacity-50 h-100 d-flex flex-column justify-content-center align-items-center">
          <h2 className="my-5 text-white"> Invoice</h2>
        </div>
      </header>
      <div className="mt-2   container">
        <div className="row justify-content-end">
          <button
            className="btn btn-outline-custom col-1 my-5 "
            onClick={() => {
              navigate("/payment", { state: { total, operationId: data.id } });
            }}
          >
            PAY
          </button>
        </div>
        <PDFViewer style={{ height: "100vh", width: "100%" }}>
          <Document style={{ width: "100%" }}>
            <Page size="A4" wrap={false}>
              <View style={styles.section} wrap={false}>
                <Text
                  style={{
                    marginVertical: "15px",
                    fontSize: "30px",
                    textAlign: "center",
                    color: "#FD743C",
                  }}
                >
                  ZIPPYLIZARD
                </Text>
                <Text
                  style={{
                    marginVertical: "15px",
                    fontSize: "30px",
                    textAlign: "center",
                  }}
                >
                  Invoice Details
                </Text>
                <Text
                  style={{
                    marginVertical: "15px",
                    color: "#FD743C",
                    width: "50%",
                  }}
                >
                  Operation Name :
                  <Text style={{ color: "black" }}>{data.name}</Text>
                </Text>
                <Text
                  style={{
                    marginVertical: "15px",
                    color: "#FD743C",
                    width: "50%",
                  }}
                  wrap={false}
                >
                  Number Of Cases :
                  <Text style={{ color: "black" }}>{data.numberOfCases}</Text>
                </Text>
                <Text style={{ marginVertical: "15px", color: "#FD743C" }}>
                  Number Of Units :
                  <Text style={{ color: "black" }}>{data.numberOfUnits}</Text>
                </Text>{" "}
                <Text style={{ marginVertical: "15px", color: "#FD743C" }}>
                  Port Of Distance :
                  <Text style={{ color: "black" }}>{data.portOfDistance}</Text>
                </Text>{" "}
                <Text style={{ marginVertical: "15px", color: "#FD743C" }}>
                  Port Of Loading :
                  <Text style={{ color: "black" }}>{data.portOfLoading}</Text>
                </Text>{" "}
                <Text style={{ marginVertical: "15px", color: "#FD743C" }}>
                  Total Weight :
                  <Text style={{ color: "black" }}>{data.totalWeight}</Text>
                </Text>
              </View>
              <View style={styles.section}>
                <Text style={{ marginVertical: "15px", fontSize: "30px" }}>
                  Document Details :
                </Text>
                <Text style={{ marginVertical: "15px", color: "#FD743C" }}>
                  Document Name :
                  <Text style={{ color: "black" }}>{data.documents.name}</Text>
                </Text>
                <Text style={{ marginVertical: "15px", color: "#FD743C" }}>
                  Container Number :
                  <Text style={{ color: "black" }}>
                    {data.documents.containerNumber}
                  </Text>
                </Text>
                <Text style={{ marginVertical: "15px", color: "#FD743C" }}>
                  Voyage Number :
                  <Text style={{ color: "black" }}>
                    {data.documents.voyageNumber}
                  </Text>
                </Text>
                <Text
                  style={{
                    marginVertical: "15px",
                    textAlign: "right",
                    fontSize: "25px",
                    color: "#FD743C",
                  }}
                >
                  Total :{data.totalWeight * data.numberOfUnits * 47} EGP
                </Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </>
  );
};
