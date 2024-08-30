"use client";

import React from 'react';
import { Container, Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Button } from 'reactstrap';
import GameImage from "../../assets/game.png"
import Link from 'next/link';
const games = [
  { id: 1, image: '/images/game2.jpg', name: 'Game One', price: '$59.99' },
  { id: 2, image: '/images/game2.jpg', name: 'Game Two', price: '$49.99' },
  { id: 3, image: '/images/game3.jpg', name: 'Game Three', price: '$39.99' },
  { id: 4, image: '/images/game4.jpg', name: 'Game Four', price: '$29.99' },
  // Add more games here
];

const GamesPage: React.FC = () => {
  return (
    <div className='background-gradient'>
      <Container>
        <Row className='mt-5'>
          {games.map((game) => (
            <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="h-100 d-flex flex-row" style={{ backgroundColor: 'black', color: '#FFF' }}>
                {/* Image Section */}
                <div style={{ flex: '0 0 40%', overflow: 'hidden' }}>
                  <CardImg 
                    top 
                    src={game.image} 
                    alt={game.name} 
                    style={{ height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                {/* Content Section */}
                <CardBody style={{ flex: '1 0 60%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <CardTitle tag="h5">{game.name}</CardTitle>
                  <CardText>{game.price}</CardText>
                  <Link href="/events" prefetch={true} className='btn btn-sm btn-light font-bold text-black' style={{width:"80%"}}>Play Game</Link>
                 
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default GamesPage;
