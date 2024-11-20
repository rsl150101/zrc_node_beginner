export const renderProfile = (req, res, next) => {
  res.render("profile", { title: "My profile" });
};

export const renderJoin = (req, res, next) => {
  res.render("join", { title: "Join" });
};

export const renderMain = (req, res, next) => {
  res.render("main", { title: "NodeBird", twits: [] });
};
