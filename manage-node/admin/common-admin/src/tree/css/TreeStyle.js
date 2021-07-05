const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginLeft:"200px",
    float:"left"
  },
  root_right: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    float:"left"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

module.exports = styles;