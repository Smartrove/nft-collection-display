import { useRouter } from "next/router";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

import axios from "axios";
import { useEffect, useState } from "react";

const image_urlAlt =
  "https://cdn.pixabay.com/photo/2022/02/14/02/52/monkey-7012380_960_720.png";

const descriptionAlt = "Non-fungible token with high resolution and prospect";

const Wallet = () => {
  const [collection, setCollection] = useState(null);
  const route = useRouter();
  const { wallet } = route.query;

  const address = "0x8BE03eFd8c935A694C504766e20C5DEf1d46B007";

  const fetchCollections = async () => {
    try {
      const { data } = await axios.get(
        `https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&include_orders=false`
      );
      console.log(data);
      setCollection(data.assets);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [wallet]);

  return (
    <>
      {collection ? (
        <Container className="mt-2" fluid>
          <Row>
            {collection.map((item, index) => (
              <Col key={index} lg={4} md={6} sm={12}>
                <Card className="mb-2 card-hover">
                  <Card.Img
                    variant="top"
                    src={item.image_url ? item.image_url : image_urlAlt}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="text-truncate">
                      {item.description ? item.description : descriptionAlt}
                    </Card.Text>
                    <Link legacyBehavior href={item.permalink}>
                      <a className="btn btn-secondary text-decoration-none">
                        Find On Opensea
                      </a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : null}
    </>
  );
};

export default Wallet;
