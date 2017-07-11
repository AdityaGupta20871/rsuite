import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import NavItem from './NavItem';
import NavDropdown from './NavDropdown';
import ReactChildren from './utils/ReactChildren';
import isNullOrUndefined from './utils/isNullOrUndefined';

const propTypes = {
  prefixClass: PropTypes.string,
  tabs: PropTypes.bool,
  pills: PropTypes.bool,
  justified: PropTypes.bool,
  stacked: PropTypes.bool,
  pullRight: PropTypes.bool,
  activeKey: PropTypes.any,
  onSelect: PropTypes.func
};

const defaultProps = {
  prefixClass: 'nav',
  tabs: false,
  pills: false,
  justified: false,
  stacked: false,
  pullRight: false,
  activeKey: undefined,
  onSelect: undefined
};

const contextTypes = {
  navbar: PropTypes.bool
};

class Nav extends React.Component {
  render() {
    const {
      prefixClass,
      tabs,
      pills,
      stacked,
      justified,
      pullRight,
      className,
      children,
      onSelect,
      activeKey,
      ...props
    } = this.props;

    const classes = classNames(prefixClass, {
      [`${prefixClass}bar-right`]: pullRight,
      [`${prefixClass}bar-nav`]: this.context.navbar,
      [`${prefixClass}-pills`]: pills,
      [`${prefixClass}-tabs`]: tabs,
      [`${prefixClass}-stacked`]: stacked,
      [`${prefixClass}-justified`]: justified
    }, className);

    const items = ReactChildren.map(children, (item) => {
      let { eventKey, active } = item.props;
      if (!React.isValidElement(item) || item.type.displayName !== 'NavItem') {
        return item;
      }
      return React.cloneElement(item, {
        onSelect,
        active: isNullOrUndefined(activeKey) ? active : _.isEqual(activeKey, eventKey)
      });
    });

    return (
      <ul {...props} className={classes} >
        {items}
      </ul>
    );
  }
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
Nav.contextTypes = contextTypes;

Nav.Item = NavItem;
Nav.Dropdown = NavDropdown;

export default Nav;
