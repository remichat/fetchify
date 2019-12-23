class SeleniumService
  def self.test_selenium
    binding.pry
    Selenium::WebDriver::Firefox::Service.driver_path = './config/geckodriver'
    driver = Selenium::WebDriver.for :firefox
    driver.navigate.to "http://google.fr"
    tmp = driver.title
    driver.quit
    tmp
  end
end
