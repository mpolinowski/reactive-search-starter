import React from 'react'
import { 
  ReactiveBase,
  DataSearch,
  MultiList,
  ReactiveList,
  ResultCard,
  SelectedFilters } from '@appbaseio/reactivesearch'

import { _connectionString, _index } from './ElasticParam'

function App() {
  return (
    <ReactiveBase
        url={_connectionString}
        app={_index}
    >
    <div style={{ display: "flex", flexDirection: "row" }}>

      <div style={{ display: "flex", flexDirection: "column", width: "15%", marginRight: "10px" }}>

          <MultiList
            componentId="searchfilter"
            dataField="tags.raw"
            title="Filter by Tags"
            aggregationSize={5}
            size={100}
            queryFormat="and"
            showSearch={false}
            showFilter={true}
            URLParams={true}
            loader="Loading ..."
          />

      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "85%", margin: "10px" }}>

          <DataSearch
            componentId="searchbox"
            placeholder="Search Assistant"
            searchOperators={true}
            autosuggest={true}
            highlight={true}
            fuzziness={1}
            debounce={100}
            showFilter={true}
            filterLabel="Filter"
            URLParams={true}
            dataField={[
              {
                "field": "title",
                "weight": 5
              },
              {
                "field": "description",
                "weight": 3
              },
              {
                "field": "tags",
                "weight": 5
              },
              {
                "field": "abstract",
                "weight": 2
              },
              {
                "field": "short",
                "weight": 2
              },
            ]}
          />
          <SelectedFilters />

          <ReactiveList
              componentId="results"
              dataField="_score"
              size={35}
              stream={true}
              pagination={true}
              paginationAt="bottom"
              loader="Loading Results.."
              showResultStats={true}
              scrollOnChange={true}
              sortOptions={[
                {
                  label: "Published",
                  dataField: "date.raw",
                  sortBy: "desc"
                },
                {
                  label: "Best Match",
                  dataField: "_score",
                  sortBy: "desc"
                }
              ]}
              react={{
                and: ["searchbox", "searchfilter"]
              }}
              render={({ data }) => (
                <ReactiveList.ResultCardsWrapper>
                {data.map((item) => (
                  <a target="_self" href={item.sublink1} style={{ textDecoration: "inherit", border: "none" }}>
                    <ResultCard key={item._id}>
                        <ResultCard.Image src={item.imagesquare} />
                        <ResultCard.Title
                          style={{ whiteSpace: "normal", overflow: "auto", textOverflow: "unset" }}
                          dangerouslySetInnerHTML={{
                          __html: item.title
                          }}
                        />
                        <ResultCard.Description
                            style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.abstract}
                        </ResultCard.Description>
                    </ResultCard>
                  </a>
                ))}
                </ReactiveList.ResultCardsWrapper>
              )}
            />

        </div>

    </div>

    </ReactiveBase>
  );
}

export default App