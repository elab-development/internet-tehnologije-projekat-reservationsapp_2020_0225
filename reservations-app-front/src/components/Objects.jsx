import React from 'react';
import Object from './Object';
import '../CSS/Objects.css';
import ListOfObjects from './ListOfOBjects';

function Objects({ loggedInUser, criteria }) {
  const postsPerPage = 2;
  const [currentPage, setCurrentPage] = React.useState(0);

  const { objects } = ListOfObjects();

  const filteredObjects = criteria
    ? objects.filter((object) =>
        object.name.toLowerCase().includes(criteria.toLowerCase())
      )
    : objects;

  const pageCount = Math.ceil(filteredObjects.length / postsPerPage);

  const displayPosts = filteredObjects.slice(currentPage * postsPerPage,
     (currentPage + 1) * postsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='objectspage'>
      <div className="objectsfeed">
        {displayPosts.map((object) => (
          <Object
            key={object.id}
            objectId={object.id}
            name = {object.name}
            manager={object.manager}
            text={object.text}
            city={object.city}
            image={object.image}
            loggedInUser={loggedInUser}
          />
        ))}
      </div>
      <div className="pagination">
      <p>CHANGE THE PAGE:</p>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={currentPage === index ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Objects;