const client = require("../../modules/elasticModule");

const searchController = {
  search: async (req, res) => {
    const { q } = req.query;

    try {
      const result = await client.search({
        index: "test_index",
        // size: 20,
        body: {
          query: {
            match_phrase_prefix: {
              // query값이 들어간 모든 데이터 조회
              content: {
                query: q, // q변수로 시작하는(단어단위) content가 들어간 데이터 조회
              },
            },
          },
        },
      });

      console.log(result.hits.hits);
      const searchResult = result.hits.hits;

      const finResult = searchResult.map((item) => item._source);

      res.status(200).json({
        message: "검색 성공",
        data: finResult,
      });
    } catch (error) {
      res.status(500).json({
        message: "ELS 서버 에러",
      });
    }
  },
};

module.exports = searchController;
