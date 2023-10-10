const controllWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
}; // отвечает за обработку и отлов ошибок, вінесена повторяющаяся логика трай кетч в хелпер

module.exports = controllWrapper;
