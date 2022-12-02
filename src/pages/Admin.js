import Table from 'react-bootstrap/Table';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/esm/Container';
import Stack from 'react-bootstrap/Stack';
import Success from "../assest/images/success.png";
import Cancel from "../assest/images/cancel.png";
import Img from 'react-bootstrap/Image';

function TableProduct() {
    return (
        <Container style={{ justifyContent: "center", width: "80%", marginTop: "20px" }}>
            <p style={{ color: "#BD0707", fontSize: "36px", fontWeight: "bold" }}>Income Transaction</p>
            <Table bordered hover className="mt-5">
                < thead >
                    <tr style={{ backgroundColor: "#828282" }}>
                        <th>No</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Post Code</th>
                        <th>Income</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead >
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Sugeng</td>
                        <td>Cileungsi</td>
                        <td>16820</td>
                        <td style={{ color: "#061E99" }}>69.000</td>
                        <td style={{ color: "#FF9900" }}>Waiting Approve</td>
                        <td>
                            <Stack direction="horizontal" gap={3} className="d-flex justify-content-center">
                                <Button className="w-50 py-0" variant="danger">Cancel</Button>
                                <Button className="w-50 py-0" variant="success">Approve</Button>
                            </Stack>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Haris Garms</td>
                        <td>Serang</td>
                        <td>41111</td>
                        <td style={{ color: "#061E99" }}>30.000</td>
                        <td style={{ color: "#78A85A" }}>Success</td>
                        <td>
                            <div className="d-flex justify-content-center">
                                <Img
                                    src={Success}
                                    style={{
                                        width: "20px",
                                        height: "20px",

                                    }}
                                />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Aziz Union</td>
                        <td>Bekasi</td>
                        <td>13450</td>
                        <td style={{ color: "#061E99" }}>28.000</td>
                        <td style={{ color: "#E83939" }}>Cancel</td>
                        <td>
                            <div className="d-flex justify-content-center">
                                <Img
                                    src={Cancel}
                                    style={{
                                        width: "20px",
                                        height: "20px",

                                    }}
                                />
                            </div></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Lae Tanjung Balal</td>
                        <td>Tanjung Balal</td>
                        <td>21331</td>
                        <td style={{ color: "#061E99" }}>38.000</td>
                        <td style={{ color: "#00D1FF" }}>On The Way</td>
                        <td>
                            <div className="d-flex justify-content-center">
                                <Img
                                    src={Success}
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                    }}
                                />
                            </div></td>
                    </tr>
                </tbody>
            </Table >
        </Container >
    );
}

export default TableProduct;