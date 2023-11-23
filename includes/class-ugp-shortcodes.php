<?php
/**
 * Plugins custom settings page that adheres to wp standard
 * see: https://developer.wordpress.org/plugins/settings/custom-settings-page/
 *
 * @since   1.0
 */

defined('ABSPATH') || exit;

/**
 * WP Settings Class.
 */
class UGP_Shortcodes
{

    /**
     * The single instance of the class.
     *
     * @since 1.0
     */
    protected static $_instance = null;

    private $location = array('U.S.' => 'U.S.', 'East Coast' => 'PADD 1', 'New England' => 'PADD 1A', 'Central Atlantic'=> 'PADD 1B', 'Lower Atlantic' => 'PADD 1C', 'Midwest' => 'PADD 2', 'Gulf Coast' => 'PADD 3', 'Rocky Mountain' => 'PADD 4', 'West Coast' => 'PADD 5', 'California' => 'CALIFORNIA');

    /**
     * Main Instance.
     * 
     * @since 1.0
     */
    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * USA gas prices table
     *
     * @since 1.0
     * @access public
     */
    public function usa_gas_prices_table_shortcode($atts) { 

        $atts = shortcode_atts( array(
            'type' => 'gasoline'
        ), $atts );

        extract($atts);

        // Fetch year ago data
        $monday = date('Y-m-d',strtotime("last Monday"));
        $last_year = date('Y-m-d',strtotime('- 1 year', strtotime("last Monday")));

        ob_start();

        if($type === 'gasoline') {

            // Fetch 3 weeks data
            $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMM_EPMR_PTE_NUS_DPG&facets[series][]=EMM_EPMR_PTE_R10_DPG&facets[series][]=EMM_EPMR_PTE_R1X_DPG&facets[series][]=EMM_EPMR_PTE_R1Y_DPG&facets[series][]=EMM_EPMR_PTE_R1Z_DPG&facets[series][]=EMM_EPMR_PTE_R20_DPG&facets[series][]=EMM_EPMR_PTE_R30_DPG&facets[series][]=EMM_EPMR_PTE_R40_DPG&facets[series][]=EMM_EPMR_PTE_R50_DPG&facets[series][]=EMM_EPMR_PTE_R5XCA_DPG&length=30');

            $year_ago = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=asc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMM_EPMR_PTE_NUS_DPG&facets[series][]=EMM_EPMR_PTE_R10_DPG&facets[series][]=EMM_EPMR_PTE_R1X_DPG&facets[series][]=EMM_EPMR_PTE_R1Y_DPG&facets[series][]=EMM_EPMR_PTE_R1Z_DPG&facets[series][]=EMM_EPMR_PTE_R20_DPG&facets[series][]=EMM_EPMR_PTE_R30_DPG&facets[series][]=EMM_EPMR_PTE_R40_DPG&facets[series][]=EMM_EPMR_PTE_R50_DPG&facets[series][]=EMM_EPMR_PTE_R5XCA_DPG&length=10&start='.$last_year.'&end='.$monday);

            require_once(UGP_TEMPLATES_ROOT_DIR . 'gasoline-prices-table.php');

        } else{

            // Fetch 3 weeks data
            $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R10_DPG&facets[series][]=EMD_EPD2D_PTE_R1X_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R1Y_DPG&facets[series][]=EMD_EPD2D_PTE_R1Z_DPG&facets[series][]=EMD_EPD2D_PTE_R20_DPG&facets[series][]=EMD_EPD2D_PTE_R30_DPG&facets[series][]=EMD_EPD2D_PTE_R40_DPG&facets[series][]=EMD_EPD2D_PTE_R50_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R5XCA_DPG&facets[series][]=EMD_EPD2DXL0_PTE_SCA_DPG&length=33');

            $year_ago = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=asc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R10_DPG&facets[series][]=EMD_EPD2D_PTE_R1X_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R1Y_DPG&facets[series][]=EMD_EPD2D_PTE_R1Z_DPG&facets[series][]=EMD_EPD2D_PTE_R20_DPG&facets[series][]=EMD_EPD2D_PTE_R30_DPG&facets[series][]=EMD_EPD2D_PTE_R40_DPG&facets[series][]=EMD_EPD2D_PTE_R50_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R5XCA_DPG&facets[series][]=EMD_EPD2DXL0_PTE_SCA_DPG&length=11&start='.$last_year.'&end='.$monday);

            require_once(UGP_TEMPLATES_ROOT_DIR . 'disel-prices-table.php');
            
        }
        
        $content = ob_get_clean();

        return $content;

    }

    /**
     * USA gas prices chart
     *
     * @since 1.0
     * @access public
     */
    public function usa_gas_prices_chart_shortcode($atts) {

        $atts = shortcode_atts( array(
            'type' => 'gasoline',
            'gasoline' => array(
                'title' => 'Regular Gasoline Prices'
            ),
            'diesel' => array(
                'title' => 'On-Highway Diesel Fuel Prices'
            ),
            'subtitle' => '(dollars per gallon)',
            'location' => $this->location
        ), $atts );
        
        ob_start();

        ?><div class="usa-gas-prices-chart" data-gas-prices-attr="<?php echo htmlspecialchars( json_encode( $atts ), ENT_QUOTES, 'UTF-8' ); ?>">
            <span>Loading...</span>
        </div><?php

        $content = ob_get_clean();
        return $content;

    }

    /**
     * API request helper
     *
     * @since 1.0
     * @access public
     */
    public function api_request($url) {

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET"
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        $data = json_decode($response)->response->data;
        $updated = array();

        foreach ($data as $key => $item) {
            $item->period = date("m/d/y", strtotime($item->period));
            $updated[$item->{'area-name'}][] = $item;
        }

        ksort($updated, SORT_NUMERIC);

        return $updated;

    }

    /**
     * Get fuel savings data.
     * 
     * @since 1.0
     */
    public function ugp_get_gasoline_year_data() {
        
        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }
  
        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }  
  
        try{
  
            // Fetch year ago data
            $monday = date('Y-m-d',strtotime("last Monday"));
            $last_year = date('Y-m-d',strtotime('- 1 year', strtotime("last Monday")));

            $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=asc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMM_EPMR_PTE_NUS_DPG&facets[series][]=EMM_EPMR_PTE_R10_DPG&facets[series][]=EMM_EPMR_PTE_R1X_DPG&facets[series][]=EMM_EPMR_PTE_R1Y_DPG&facets[series][]=EMM_EPMR_PTE_R1Z_DPG&facets[series][]=EMM_EPMR_PTE_R20_DPG&facets[series][]=EMM_EPMR_PTE_R30_DPG&facets[series][]=EMM_EPMR_PTE_R40_DPG&facets[series][]=EMM_EPMR_PTE_R50_DPG&facets[series][]=EMM_EPMR_PTE_SCA_DPG&start='.$last_year.'&end='.$monday);
            
            wp_send_json(array(
                'status' => 'success',
                'orig' => $data,
                'order' => $this->location
            ));
  
        } catch (Exception $e) {
  
            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
  
        }
        
    }

    private function html_tooltip($key, $data) {
        $html = '<div style="padding: 10px; width: 180px;">';
        $html .= '<h6>'.$key.'</h6>';
        $html .= '<p style="padding-bottom: 4px; margin: 0px;">'.date('M j, Y',strtotime($data->period)).'</p>';
        $html .= '<p style="padding-bottom: 4px; margin: 0px;">$'.$data->value.' dollars per gallon</p>';
        $html .= '</div>';
        return $html;
    }

    /**
     * Get diesel savings data.
     * 
     * @since 1.0
     */
    public function ugp_get_diesel_year_data() {
        
        if (!defined('DOING_AJAX') || !DOING_AJAX) {
            wp_die();
        }
  
        /**
         * Verify nonce
         */
        if (isset($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'settings_nonce')) {
            wp_die();
        }  
  
        try{
  
            // Fetch year ago data
            $monday = date('Y-m-d',strtotime("last Monday"));
            $last_year = date('Y-m-d',strtotime('- 1 year', strtotime("last Monday")));

            $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=asc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R10_DPG&facets[series][]=EMD_EPD2D_PTE_R1X_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R1Y_DPG&facets[series][]=EMD_EPD2D_PTE_R1Z_DPG&facets[series][]=EMD_EPD2D_PTE_R20_DPG&facets[series][]=EMD_EPD2D_PTE_R30_DPG&facets[series][]=EMD_EPD2D_PTE_R40_DPG&facets[series][]=EMD_EPD2D_PTE_R50_DPG&facets[series][]=EMD_EPD2DXL0_PTE_R5XCA_DPG&facets[series][]=EMD_EPD2DXL0_PTE_SCA_DPG&start='.$last_year.'&end='.$monday);

            wp_send_json(array(
                'status' => 'success',
                'orig' => $data,
                'order' => $this->location
            ));
  
        } catch (Exception $e) {
  
            wp_send_json(array(
                'status' => 'error',
                'message' => $e->getMessage()
            ));
  
        }
        
    }

    /**
     * Display current average gas prices
     *
     * @since 1.0
     * @access public
     */
    public function display_current_average_price_shortcode($atts) {

        $atts = shortcode_atts( array(
            'type' => 'gasoline'
        ), $atts );
        
        extract($atts);

        if($type === 'gas'){
            $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMM_EPMR_PTE_NUS_DPG&length=1');
        } else {
            $data = $this->api_request('https://api.eia.gov/v2/petroleum/pri/gnd/data?data[]=value&frequency=weekly&sort[0][column]=period&sort[0][direction]=desc&api_key=jtxw1tp7sOIBsYhTQLDIEmGgumigkvxqnlQYBDvh&facets[series][]=EMD_EPD2DXL0_PTE_NUS_DPG&length=1');
        }

        ob_start();
        
        ?><div class="todays-gas-price-average">
            <div>
                <b><?php echo $type == 'gasoline' ? 'TODAYS GAS PRICE' : 'TODAYS DIESEL PRICE'; ?></b>
                <p><?php echo $type == 'gasoline' ? 'NATIONAL AVERAGE GASOLINE PRICE' : 'NATIONAL AVERAGE ROAD DIESEL PRICE'; ?></p>
                <p>AS OF <?php echo date('m/d/y'); ?></p>
            </div>
            <div><?php echo !empty($data) ? '$'. number_format((float)$data['U.S.'][0]->value, 2, '.', '') : '';?></div>
        </div><?php

        $content = ob_get_clean();
        return $content;
    }

    /**
     * Execute Model.
     *
     * @since 1.0
     * @access public
     */
    public function run() { 

        // USA gas prices table shortcode
        add_shortcode('usa_gas_prices_table', array($this, 'usa_gas_prices_table_shortcode'));
        
        // USA gas prices chart shortcode
        add_shortcode('usa_gas_prices_chart', array($this, 'usa_gas_prices_chart_shortcode'));

        // Fetch gasonline prices over the year via ajax 
        add_action("wp_ajax_ugp_get_gasoline_year_data", array($this, 'ugp_get_gasoline_year_data'));
        add_action("wp_ajax_nopriv_ugp_get_gasoline_year_data", array($this, 'ugp_get_gasoline_year_data'));
        
        // Fetch diesel prices over the year via ajax 
        add_action("wp_ajax_ugp_get_diesel_year_data", array($this, 'ugp_get_diesel_year_data'));
        add_action("wp_ajax_nopriv_ugp_get_diesel_year_data", array($this, 'ugp_get_diesel_year_data'));

        // Current Gas and Diesel price shortcode
        add_shortcode('display_current_average_price', array($this, 'display_current_average_price_shortcode'));

    }
    
}