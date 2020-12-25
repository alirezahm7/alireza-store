import {connect} from 'react-redux';
import { compose } from 'redux';
import {createStructuredSelector} from 'reselect';
import WithSpiner from '../../components/with-spiner/with-spiner.component';
import { selectCollectionsLoaded } from '../../redux/shop/shop.selectors';
import CollectionPage from './collection.component';



const mapStateToProps=createStructuredSelector({
    isLoading :(state) =>!selectCollectionsLoaded(state)
})

const collectionContainer =compose(
    connect(mapStateToProps),
    WithSpiner
)(CollectionPage)

export default collectionContainer;