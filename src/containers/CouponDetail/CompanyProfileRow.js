import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components/native';
import { View, Image } from 'react-native';
import { Typo, ButtonTag } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import chroma from 'chroma-js';

const Container = styled(View)`
  padding: 20px 20px;
  background-color: ${props => props.background ? props.background : Palette.neutralLight};
  align-items: center;
  justify-content: center;
  ${props => !props.background && css`
    border-top-color: ${Palette.neutral};
    border-bottom-color: ${Palette.neutral};
    border-bottom-width: 1;
    border-top-width: 1;
  `};
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

const ProfileButton = styled(ButtonTag)`
`;

const InfoContainer = styled(View)`
  align-items: center;
  background-color: ${Palette.white};
  padding: 10px;
  border-radius: 10px;
  min-width: 50%;
  ${props => !props.background && css`
    border: 2px solid ${Palette.neutral};
  `};
`;

const upperCaseText = (text = '') => text.toUpperCase();

const CompanyProfileRow = ({ avatar, name, slogan, button, background }) => {
  return (
    <Container background={background}>
      <InfoContainer background={background}>
        {avatar && <Avatar resizeMode="cover" source={{uri: avatar}}/>}
        <Info>
          {name && <Name bold small>{upperCaseText(name)}</Name>}
          {slogan && <Slogan secondary small>{slogan}</Slogan>}
        </Info>
        <ProfileButton {...button} />
      </InfoContainer>
    </Container>
  );
};

CompanyProfileRow.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  slogan: PropTypes.string,
  button: PropTypes.object,
}

export default CompanyProfileRow;