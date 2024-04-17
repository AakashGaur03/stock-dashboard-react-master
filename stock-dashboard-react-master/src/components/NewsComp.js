import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const NewsComp = ({ newsData }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Row xs={1} md={4} className="g-4">
      {newsData &&
        newsData.map((news) => (
          <Col key={news.id}>
            <Card
              className={`${darkMode ? "darkModeClass" : "lightModeClass"}`}
            >
              <Card.Img
                variant="top"
                src={news.thumbnail?.resolutions[0].url ? news.thumbnail?.resolutions[0].url : 'NoImgAvail.png'}
                style={{ maxHeight: "200px", minHeight: "200px" }}
              />
              <Card.Body className="d-flex flex-col justify-between">
                <Card.Title className="wordLimit">{news.title}</Card.Title>
                {news.previewUrl ? (
                  <Button
                    className="btnColor"
                    variant="primary"
                    href={news.previewUrl}
                    target="_blank"
                  >
                    Read Full News
                  </Button>
                ) : (
                  <Button disabled variant="primary">
                    No Preview Available
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default NewsComp;
