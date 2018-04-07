import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, ImageBackground } from 'react-native';
import { Typo } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo';

const Container = styled(ImageBackground)`
  height: 335px;
`;

const Layout = styled(View)`
  flex: 1;
  background-color: ${props => props.color || Palette.dark.alpha(0.5).css()};
  padding: 10px 20px;
  justify-content: space-between;
`;

// Header
const Header = styled(View)`
  flex-flow: row nowrap;
  width: 90%;
`;

const TitleAndDateContainer = styled(View)`
  flex: 1;
`;

const ExpiredDate = styled(Typo.TextBody)`
  margin-bottom: 5;
`;

const Title = styled(Typo.Title)`
  line-height: 27;
`;

// Footer
const Footer = styled(View)`
  flex-flow: row nowrap;
`;

const CompanyName = styled(Typo.Header)`
  flex: 1;
  align-self: flex-end;
`;

const TicketsContainer = styled(View)`
`;

const TicketsNumber = styled(Typo.Title)`
  line-height: 70;
  flex-flow: row;
  justify-content: flex-end;
  align-self: flex-end;
  align-items: flex-end;
  top: 15;
  left: 5;
`;

const TicketsHeader = styled(Typo.TextBody)`
  text-align: right;
`;

const TicketsHeaderIcon = styled(Ionicons)`
  margin-right: 10;
`;

const upperCaseText = (text = '') => text.toUpperCase();

const CouponCover = ({ background, date, title, companyName, couponsCount, couponsCountCaption }) => {
  return (
    <Container source={background} resizeMode="cover">
      <Layout>
        <Header>
          <TitleAndDateContainer>
            <ExpiredDate small inverted>{date}</ExpiredDate>
            <Title normal inverted>{title}</Title>
          </TitleAndDateContainer>
        </Header>

        <Footer>
          <CompanyName small inverted>{upperCaseText(companyName)}</CompanyName>

          <TicketsContainer>
            <TicketsNumber jumbo inverted>{couponsCount}</TicketsNumber>

            <TicketsHeader small inverted>
              <TicketsHeaderIcon name="md-wifi" size={15} color={Palette.white.css()}/>
              {upperCaseText(couponsCountCaption)}
            </TicketsHeader>
          </TicketsContainer>
        </Footer>
      </Layout>
    </Container>
  );
};

CouponCover.propTypes = {
  background: PropTypes.shape({
    uri: PropTypes.string,
    source: PropTypes.any,
  }),
  date: PropTypes.string,
  title: PropTypes.string,
  companyName: PropTypes.string,
  couponsCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  couponsCountCaption: PropTypes.string,
}

export default CouponCover;