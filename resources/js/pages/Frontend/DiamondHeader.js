import React from 'react'

const shapes = [
    {
        name: 'Round',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-round.svg?v=12693028039347699321',
    },
    {
        name: 'Oval',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-oval.svg?v=2497033182748759259',
    },
    {
        name: 'Cushion',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-cusion.svg?v=11214961818959539646',
    },
    {
        name: 'Princess',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-pricess.svg?v=16220410196671539921',
    },
    {
        name: 'Pear',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-pear.svg?v=3686681557302028351',
    },
    {
        name: 'Marquise',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-marquise.svg?v=13322033320278941088',
    },
    {
        name: 'Asscher',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-asscher.svg?v=4564496663447661558',
    },
    {
        name: 'Radiant',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-radiant.svg?v=16126585984193094258',
    },
    {
        name: 'Heart',
        image: '//cdn.shopify.com/s/files/1/0588/7852/5589/t/1/assets/diamond-heart.svg?v=15786379548922254164',
    }

]

export default function DiamondHeader() {
    const [activeShape, setActiveShape] = React.useState(null);
    const handleActiveShape = (name) => {
        setActiveShape(name);
    };

    return (
        <div>
            <div className="inner-search-options">
                <h3 className="option-title uppercase">SHAPE</h3>
                <div className="shapes">
                    <ul className='shapes-ul'>
                        {shapes.map((shape, index) => (
                            <li key={index} className={activeShape === shape.name ? 'active' : null} onClick={() => handleActiveShape(shape.name)}  >
                                <div className="icon shape-round">
                                    <img src={shape.image} alt={shape.name} />
                                </div>
                                <div className="text">{shape.name}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
if (document.getElementById('searchHeader')) {
    ReactDOM.render(<DiamondHeader />, document.getElementById('searchHeader'));
}