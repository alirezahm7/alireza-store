import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import collectionContainer from '../collection/collection.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.action';
import collectionOverviewContainer from '../../components/collections-overview/collection-overview.container';

const ShopPage = ({ fetchCollectionsStart, match }) => {
  
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={collectionOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={collectionContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
