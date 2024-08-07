const progressCalculator = (pageCount, currentPage) => {

    return ((currentPage / pageCount) * 100).toFixed(0);

  }

  export default progressCalculator;