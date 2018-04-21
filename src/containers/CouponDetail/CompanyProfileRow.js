import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Image } from 'react-native';
import { Typo, ButtonTag } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';

const Container = styled(View)`
  padding: 20px 20px
  background-color: ${Palette.neutralLight};
  border-top-color: ${Palette.neutral};
  border-bottom-color: ${Palette.neutral};
  border-bottom-width: 1;
  border-top-width: 1;
  align-items: center;
  justify-content: center;
`;

const Description = styled(Typo.TextBody)`
`;

const Avatar = styled(Image)`
  height: 60;
  width: 60;
  background-color: ${Palette.dark};
  border-radius: 30;
`;

const Info = styled(View)`
  margin: 20px 0px;
  max-width: 240px;
`;

const Name = styled(Typo.Header)`
  text-align: center;
`;
const Slogan = styled(Typo.TextBody)`
  text-align: center;
`;

const GetCouponButton = styled(ButtonTag)`
`;

const upperCaseText = (text = '') => text.toUpperCase();

const CompanyProfileRow = ({ avatar, name, slogan, button }) => {
  return (
    <Container>
      {avatar && <Avatar resizeMode="cover" source={avatar}/>}
      <Info>
        {name && <Name small>{upperCaseText(name)}</Name>}
        {slogan && <Slogan secondary small>{slogan}</Slogan>}
      </Info>
      <GetCouponButton {...button} />
    </Container>
  );
};

CompanyProfileRow.propTypes = {
  avatar: PropTypes.shape({
    source: PropTypes.any,
    uri: PropTypes.string,
  }),
  name: PropTypes.string,
  slogan: PropTypes.string,
  button: PropTypes.object,
}

export default CompanyProfileRow;