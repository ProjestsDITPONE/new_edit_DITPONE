import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, SectionList} from 'react-native';

export default class SearchableSectionList extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    searchAttribute: PropTypes.string.isRequired,
    searchByTitle: PropTypes.bool,
    ignoreCase: PropTypes.bool,
  };

  static defaultProps = {
    searchAttribute: '',
    searchByTitle: false,
    ignoreCase: true,
  };

  render() {
    const {
      sections,
      searchAttribute,
      searchTerm,
      ignoreCase,
      searchByTitle,
    } = this.props;
    return (
      <SectionList
        {...this.props}
        sections={sections.reduce((result, sectionData) => {
          const {continent_title, continent_data} = sectionData;

          const filteredData = continent_data.filter(item => {
            let searchDataItem = continent_title;
            if (!searchByTitle) {
              searchDataItem = searchAttribute
                ? searchAttribute
                    .split('.')
                    .reduce((prevVal, currVal) => prevVal[currVal], item)
                : item;
            }
            if (ignoreCase) {
              return searchDataItem
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            } else {
              return searchDataItem.includes(searchTerm);
            }
          });

          if (filteredData.length !== 0) {
            result.push({
              continent_title,
              data: filteredData,
            });
          }

          return result;
        }, [])}
      />
    );
  }
}
