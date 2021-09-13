import React, { useCallback } from 'react';
import { removeSearchHistoryRecord, selectSearchHistory } from 'src/redux/slices/Search/search';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchHistory.module.scss';
import Header from '../PreInput/Header';
import SearchQuerySuggestion from '../PreInput/SearchQuerySuggestion';

interface Props {
  onSearchKeywordClicked: (searchQuery: string) => void;
}

const SearchHistory: React.FC<Props> = ({ onSearchKeywordClicked }) => {
  const searchHistory = useSelector(selectSearchHistory);
  const dispatch = useDispatch();

  const onRemoveSearchQueryClicked = useCallback(
    (searchQuery: string) => {
      dispatch({ type: removeSearchHistoryRecord.type, payload: searchQuery });
    },
    [dispatch],
  );

  // if there are no recent search queries.
  if (!searchHistory.length) {
    return <></>;
  }
  return (
    <div className={styles.container}>
      <Header text="Recent searches" />
      {searchHistory.map((recentSearchQuery) => (
        <SearchQuerySuggestion
          searchQuery={recentSearchQuery}
          key={`${recentSearchQuery}`}
          onSearchKeywordClicked={onSearchKeywordClicked}
          onRemoveSearchQueryClicked={onRemoveSearchQueryClicked}
        />
      ))}
    </div>
  );
};

export default SearchHistory;