import React from 'react';
import ReactDOM from 'react-dom';
import CarouselA from 'react-responsive-carousel';

export class Carousel extends React.Component {
    render() {
        return (
            <CarouselA
                showArrows={true}
                onChange={onChange}
                onClickItem={onClickItem}
                onClickThumb={onClickThumb}
            >
                <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="assets/4.jpeg" />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src="assets/5.jpeg" />
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    <img src="assets/6.jpeg" />
                    <p className="legend">Legend 6</p>
                </div>
            </CarouselA>
        );
    }
}
