import React from 'react';
import SHOP_DATA from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            collections : SHOP_DATA
        }
    }

    renderCollection = () => {
        return this.state.collections.map(({ id, ...otherCollectionProps}) => {
            return (
            <CollectionPreview key={id} {...otherCollectionProps} />
            );
        })
    }

    render() {
        return (
            <div className="shop-page">
                {this.renderCollection()} 
            </div>
        )
    };
}

export default ShopPage;