class SeleniumService
  def self.test_selenium
    Selenium::WebDriver::Firefox::Service.driver_path = './config/geckodriver'
    driver = Selenium::WebDriver.for :firefox
    driver.navigate.to "https://myfreemp3c.com/fr"
    tmp = driver.title
    binding.pry
    driver.quit
    tmp
  end
end
