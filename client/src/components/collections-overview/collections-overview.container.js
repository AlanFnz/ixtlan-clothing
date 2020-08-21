import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux'; // To chain functions

import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors.js'
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer