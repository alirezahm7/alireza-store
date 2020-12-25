import {connect} from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpiner from '../with-spiner/with-spiner.component';
import CollectionsOverview from './collections-overview.component';




const mapStateToProps = createStructuredSelector({
    isLoading:selectCollectionFetching
})

const collectionOverviewContainer =compose(
    connect(mapStateToProps),
    WithSpiner
)(CollectionsOverview)

export default collectionOverviewContainer;